import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { permission } from '@smart-fleet-management/users';

import { Permissions, UserSession } from '@/common/infrastructure/decorators';
import { Public } from '@/common/infrastructure/decorators/public.decorator';
import { LocalAuthGuard } from '@/common/infrastructure/guards/local-auth.guard';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { CreateUserPayloadDto } from '@/modules/user/dto/create-user.dto';
import { User } from '@/modules/user/entities/user.entity';
import { CreateSwaggerDocs } from '@/services/swagger/decorators';

import { CreateUserResponseDto } from '../user/dto/create-user-response.dto';

import { SignInResponseDto } from './dto/sign-in-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @CreateSwaggerDocs({
    apiOkResponseExample: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
    customBody: {
      refreshToken: { type: 'string' },
    },
    summary: 'Refresh user tokens',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @Public()
  refresh(@Body('refresh_token') refresh_token: string) {
    return this.authService.refreshTokens(refresh_token);
  }

  @CreateSwaggerDocs({
    apiOkResponseDto: SignInResponseDto,
    authRequired: false,
    bodyDto: LoginUserDto,
    summary: 'Login user',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  signIn(@Request() req): Promise<SignInResponseDto> {
    return this.authService.signIn(req);
  }

  @CreateSwaggerDocs({
    apiOkResponseDto: CreateUserResponseDto,
    bodyDto: CreateUserPayloadDto,
    description:
      'You can create new user only if you are signed in with user who have ADMIN role',
    summary: 'Create new user',
  })
  @HttpCode(HttpStatus.CREATED)
  @Permissions([permission.USER_MODULE_WRITE])
  @Post('signup')
  signUp(
    @UserSession() user: User,
    @Body() createUserPayload: CreateUserPayloadDto,
  ): Promise<User> {
    return this.authService.signUp(user, createUserPayload);
  }
}
