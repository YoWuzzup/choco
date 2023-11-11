import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { LoginDto } from 'src/dtos/authData.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ _id?: ObjectId | string; email?: string } | null> {
    const user = await this.userService.findOneUser({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();

      return result;
    }
    return null;
  }

  async login(data: LoginDto, response: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, email, ...payload } = data;
    const validatedUser = await this.validateUser(email, password);
    if (!validatedUser)
      throw new BadRequestException('User does not exist or wrong credentials');

    const refreshToken = await this.createJwtToken(
      { id: validatedUser._id, email: validatedUser.email },
      'refresh',
    );

    // Set refreshToken as a cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });

    return {
      access_token: await this.createJwtToken(
        { id: validatedUser._id, email: validatedUser.email },
        'access',
      ),
    };
  }

  async createJwtToken(payload: any, type: 'refresh' | 'access') {
    return this.jwtService.signAsync(payload, {
      expiresIn:
        type === 'refresh'
          ? this.configService.get('JWT_REFRESH_EXPIRESIN') / 1000
          : this.configService.get('JWT_EXPIRESIN'),
    });
  }

  async validateJwtToken(jwt: string) {
    try {
      const decoded = this.jwtService.verify(jwt);

      return decoded; // The token is valid, return the decoded payload
    } catch (error) {
      // If an error occurs during verification, it means the token is invalid
      throw new UnauthorizedException('Invalid token.');
    }
  }

  async updateRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    const decodedToken: any = this.jwtService.decode(refreshToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...payload } = decodedToken;

    const updatedRefreshToken = await this.createJwtToken(payload, 'refresh');
    const updatedAccessToken = await this.createJwtToken(payload, 'access');

    res.cookie('refresh_token', updatedRefreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });

    return { access_token: updatedAccessToken };
  }
}
