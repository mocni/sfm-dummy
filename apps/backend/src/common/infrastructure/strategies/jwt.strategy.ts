import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { JwtPayload } from '@smart-fleet-management/users';

import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    const JWT_SECRET = configService.get<string>('JWT_SECRET');
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }

    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { sub } = payload;

    const user: null | User = await this.usersRepository.findOne({
      where: {
        id: sub,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
