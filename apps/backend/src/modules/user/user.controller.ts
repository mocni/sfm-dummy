import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import {
  createUserPayloadSchema,
  permission,
} from '@smart-fleet-management/users';

import { Permissions, UserSession } from '@/common/infrastructure/decorators';
import { CreateSwaggerDocs } from '@/services/swagger/decorators';

import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserPayloadDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @CreateSwaggerDocs({
    apiOkResponseDto: CreateUserResponseDto,
    bodyDto: CreateUserPayloadDto,
    description:
      'You can create new company user only if you are signed in with user who have COMPANY_USER_WRITE permission',
    summary: 'Create new company user',
  })
  @Permissions([permission.COMPANY_USER_WRITE])
  @Post('company-user')
  async createCompanyUser(
    @UserSession() user: User,
    @Body(new ZodValidationPipe(createUserPayloadSchema))
    createUserPayload: CreateUserPayloadDto,
  ): Promise<User> {
    return this.usersService.createCompanyUser(user, createUserPayload);
  }

  // TODO: create COMPANY_USER_READ permission which will be used in getCompanyUser to fetch all company users

  @CreateSwaggerDocs({
    apiOkResponseDto: CreateUserResponseDto,
    bodyDto: CreateUserPayloadDto,
    description:
      'You can create new user only if you are signed in with user who have USER_MODULE_WRITE permission (admin access)',
    summary: 'Create new user (admin only)',
  })
  @Permissions([permission.USER_MODULE_WRITE])
  @Post()
  async createUser(
    @UserSession() user: User,
    @Body(new ZodValidationPipe(createUserPayloadSchema))
    createUserPayload: CreateUserPayloadDto,
  ): Promise<User> {
    return this.usersService.createUser(user, createUserPayload);
  }

  @Get()
  @Permissions([permission.USER_MODULE_READ])
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
