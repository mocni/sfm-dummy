import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  JwtPayload,
  TokenType,
  tokenType,
} from '@smart-fleet-management/users';

import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class TokenService {
  private readonly jwtExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtExpiresIn =
      configService.get<string>('JWT_ACCESS_TOKEN_EXPIRE') ?? '90m';
    this.refreshTokenExpiresIn =
      configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE') ?? '120m';
  }

  async generateAuthTokens(user: User): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const access_token = await this.generateToken(user, tokenType.ACCESS);
    const refresh_token = await this.generateToken(user, tokenType.REFRESH);
    return { access_token, refresh_token };
  }

  async generateToken(user: User, type: TokenType): Promise<string> {
    const payload: JwtPayload = {
      email: user.email,
      groups: user.groups,
      permissions: user.permissions,
      sub: user.id,
      type,
      username: user.username,
    };
    const expiresIn =
      type === tokenType.ACCESS
        ? this.jwtExpiresIn
        : this.refreshTokenExpiresIn;

    return this.jwtService.signAsync(payload, { expiresIn });
  }

  verifyToken(token: string, type: TokenType): any {
    try {
      const decoded = this.jwtService.verify(token);

      if (decoded.type !== type) {
        throw new Error('Invalid token type');
      }
      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Generate reset password token
  //   generateResetPasswordToken(userId: string): string {
  //     return this.generateToken(userId, 'RESET_PASSWORD');
  //   }

  // Generate verify email token
  //   generateVerifyEmailToken(userId: string): string {
  //     return this.generateToken(userId, 'VERIFY_EMAIL');
  //   }
}
