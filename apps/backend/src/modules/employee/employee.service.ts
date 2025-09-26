import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmployeeType } from '@smart-fleet-management/common';
import { userGroup } from '@smart-fleet-management/users';

import { updateEntity } from '@/common/usecases/update-entity';
import { PaginationService, ResponseData } from '@/services/pagination';

import { User } from '../user/entities/user.entity';

import { CreateEmployeePayloadDto, GetEmployeesQueryDto } from './dto';
import { IEmployeeService } from './employee-service.interface';
import { Employee } from './entities/employee.entity';
import { validateEmployeeDriverUniqueConstraints } from './helpers';
import { UpdateEmployeePayload } from './schemas/payloads';

@Injectable()
export class EmployeeService implements IEmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly paginationService: PaginationService,
  ) {}

  async createEmployee(
    user: User,
    createEmployeePayload: CreateEmployeePayloadDto,
  ): Promise<Employee> {
    // Validate user belongs to a company

    // Validate unique constraints
    await validateEmployeeDriverUniqueConstraints(
      createEmployeePayload,
      this.employeeRepository,
    );

    // Create employee entity
    const newEmployee = this.employeeRepository.create({
      ...createEmployeePayload,
    });

    // Save employee to database
    const savedEmployee = await this.employeeRepository.save(newEmployee);

    return savedEmployee;
  }

  async getEmployee(user: User, employeeId: string): Promise<Employee> {
    const employee = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoin('employee.user', 'user')
      .addSelect([
        'user.id',
        'user.email',
        'user.username',
        'user.groups',
        'user.password',
        'user.permissions',
      ])
      .where('employee.id = :employeeId', { employeeId })
      .getOne();

    if (!employee) {
      throw new BadRequestException(`Employee with id ${employeeId} not found`);
    }
    // // Check if user has permission to view this employee
    const canView = this.canUserViewEmployee(user, employee);

    if (!canView) {
      throw new ForbiddenException(
        'You do not have permission to view this employee. Only OWNER, ADMIN, or the employee themselves can view employee information.',
      );
    }

    return employee;
  }

  async getEmployees(
    getEmployeesQuery: GetEmployeesQueryDto,
    user: User,
  ): Promise<ResponseData<Employee>> {
    const queryBuilder = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoin('employee.user', 'user')
      .addSelect(['user.id', 'user.email', 'user.username', 'user.groups'])
      .where('employee.company_id = :id', { id: 1 });

    // TODO: make helper function where I will check if user group include OWNER or ADMIN or keyword 'ADMIN' in the user groups
    if (
      !user.groups.includes(userGroup.OWNER) &&
      !user.groups.includes(userGroup.ADMIN)
    ) {
      queryBuilder.andWhere('employee.user_id = :userId', { userId: user.id });
    }

    return await this.paginationService.paginate<
      Employee,
      GetEmployeesQueryDto
    >(queryBuilder, getEmployeesQuery);
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }

  async updateEmployee(
    user: User,
    id: string,
    updateEmployeePayload: UpdateEmployeePayload,
  ) {
    // First, get the employee to check permissions
    const employee = await this.employeeRepository.findOne({
      relations: ['user', 'company'],
      where: { id },
    });

    if (!employee) {
      throw new BadRequestException(`Employee with id ${id} not found`);
    }

    // Check if user has permission to edit this employee
    if (!this.canUserEditEmployee(user, employee)) {
      throw new ForbiddenException(
        'You do not have permission to edit this employee',
      );
    }

    // Regular update without user creation
    return await updateEntity<Employee>(
      'Employee',
      user,
      id,
      this.employeeRepository,
      updateEmployeePayload,
    );
  }

  // TODO: refactor this as a helper functions (if needed)
  private canUserEditEmployee(user: User, employee: Employee): boolean {
    // If the employee is an OWNER, only another OWNER can edit them
    if (employee.type === EmployeeType.OWNER) {
      // Only OWNER users can edit owner employees
      if (user.groups.includes(userGroup.OWNER)) {
        // If employee has a user account, only that specific owner can edit their own data
        if (employee.user) {
          return employee.user.id === user.id;
        }
        // If employee doesn't have a user account, any OWNER can edit
        return true;
      }
      return false;
    }

    // For non-owner employees: OWNER and ADMIN can edit any employee in the company
    if (
      user.groups.includes(userGroup.OWNER) ||
      user.groups.includes(userGroup.ADMIN)
    ) {
      return true;
    }

    // If employee has a user account, only that user can edit their own employee information
    if (employee.user && employee.user.id === user.id) {
      return true;
    }

    // If employee doesn't have a user account, only OWNER and ADMIN can edit
    return false;
  }

  private canUserViewEmployee(user: User, employee: Employee): boolean {
    // If the employee is an OWNER, only another OWNER can view them
    if (employee.type === EmployeeType.OWNER) {
      return user.groups.includes(userGroup.OWNER);
    }

    // OWNER and ADMIN can view any non-owner employee in the company
    if (
      user.groups.includes(userGroup.OWNER) ||
      user.groups.includes(userGroup.ADMIN) ||
      user.groups.includes(userGroup.DISPATCHER_ADMIN) ||
      user.groups.includes(userGroup.ACCOUTING_ADMIN)
    ) {
      return true;
    }

    // If employee has a user account, only that user can view their own employee information
    if (employee.user && employee.user.id === user.id) {
      return true;
    }

    // If employee doesn't have a user account, only OWNER and ADMIN can view
    return false;
  }
}
