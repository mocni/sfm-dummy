import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser({ password, username });
    if (!user) {
      throw new UnauthorizedException(`Invalid Username or password`);
    }
    return user;
  }
}
