import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { LoginDto } from 'src/dtos/authData.dto';
import { Users } from 'src/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userService.findOneUser({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();

      return true;
    }
    return false;
  }

  async login(data: LoginDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payload } = data;

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN') / 1000,
      }),
    };
  }

  async refreshToken(user: Users) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payload } = user;

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
