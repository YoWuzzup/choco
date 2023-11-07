import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { LoginDto } from 'src/dtos/authData.dto';
import { Users } from 'src/models/users.model';
import { Response } from 'express';

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

  async login(data: LoginDto, response: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, email, ...payload } = data;
    const validatedUser = await this.validateUser(email, password);
    if (!validatedUser)
      throw new BadRequestException('User does not exist or wrong credentials');

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN') / 1000,
    });

    // Set refreshToken as a cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });

    return {
      accessToken: this.jwtService.sign(payload),
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
