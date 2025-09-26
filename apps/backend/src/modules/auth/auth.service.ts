import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { tokenType } from '@smart-fleet-management/users';

import { TokenService } from '@/services/token/token.service';

import { CreateUserPayloadDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

import { SignInResponseDto } from './dto/sign-in-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async refreshTokens(
    refresh_token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const decoded = this.tokenService.verifyToken(
        refresh_token,
        tokenType.REFRESH,
      );
      console.log(decoded);
      const user = await this.usersRepository.findOne({
        where: { id: decoded.sub },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const generateTokensPair =
        await this.tokenService.generateAuthTokens(user);

      return generateTokensPair;
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async signIn(@Request() req): Promise<SignInResponseDto> {
    console.log(req.user);
    const tokens = await this.tokenService.generateAuthTokens(req.user);

    // Ensure we have the latest user data with employee relation
    const userWithEmployee = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .leftJoinAndSelect('user.company', 'company')
      .select([
        'user.id',
        'user.email',
        'user.username',
        'user.groups',
        'user.permissions',
        'user.created_at',
        'user.updated_at',
        'employee',
        'company',
      ])
      .where('user.id = :id', { id: req.user.id })
      .getOne();

    if (!userWithEmployee) {
      throw new BadRequestException('User not found');
    }

    return {
      ...tokens,
      user: userWithEmployee,
    };
  }

  async signUp(
    user: User,
    createUserPayload: CreateUserPayloadDto,
  ): Promise<User> {
    return this.usersService.createUser(user, createUserPayload);
  }
}
