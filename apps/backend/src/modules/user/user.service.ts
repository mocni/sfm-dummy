import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  groupsPermissions,
  permission,
  Permission,
  userGroup,
} from '@smart-fleet-management/users';

import { LoginUserDto } from '../auth/dto/login-user.dto';
import { Employee } from '../employee/entities/employee.entity';

import { CreateUserPayloadDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { employeeEntityExists } from './helpers';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async createCompanyUser(
    user: User,
    createUserPayload: CreateUserPayloadDto,
  ): Promise<User> {
    return user;
  }

  async createUser(
    user: User,
    createUserPayload: CreateUserPayloadDto,
  ): Promise<User> {
    const { employee_id, groups } = createUserPayload;

    // Check if user has USER_MODULE_WRITE permission (admin access)
    const hasUserModuleWritePermission = user.permissions.includes(
      permission.USER_MODULE_WRITE,
    );

    if (!hasUserModuleWritePermission) {
      throw new ConflictException(
        `Only users with ${permission.USER_MODULE_WRITE} permission can create users.`,
      );
    }

    // Additional check for creating ADMIN users
    const isCreatingAdmin = groups.includes(userGroup.ADMIN);
    if (isCreatingAdmin && !hasUserModuleWritePermission) {
      throw new ConflictException(
        `Only users with ${permission.USER_MODULE_WRITE} permission can create ADMIN users.`,
      );
    }

    // If employee_id is provided, validate the employee exists
    if (employee_id) {
      await employeeEntityExists(employee_id, this.employeeRepository);
    }

    return this.createAndSaveUser(createUserPayload);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async userExists(username: string, email?: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (user) {
      throw new ConflictException(
        `User with ${username} or ${email} already exists.`,
      );
    }
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<null | User> {
    const { password, username } = loginUserDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  private async createAndSaveUser(
    createUserPayload: CreateUserPayloadDto,
  ): Promise<User> {
    const { email, employee_id, groups, username } = createUserPayload;

    await this.userExists(username, email);

    const permissions = this.derivePermissions(groups);

    const newUser = this.usersRepository.create({
      ...createUserPayload,
      // company: companyId ? { id: companyId } : undefined,
      permissions,
    });

    const savedUser = await this.usersRepository.save(newUser);

    // Update the employee's user_id if employee_id was provided
    if (employee_id) {
      await this.employeeRepository.update(employee_id, {
        user: { id: savedUser.id },
      });
    }

    return savedUser;
  }

  private derivePermissions(groups: string[]): Permission[] {
    return groups
      .flatMap((group) => groupsPermissions[group] ?? [])
      .filter((perm, index, arr) => arr.indexOf(perm) === index); // deduplicate
  }
}
