import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { LoginDto } from 'src/dtos/authData.dto';
import { returnUserDto } from 'src/dtos/user.dto';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<returnUserDto | null> {
    const user = await this.userService.findOneUser({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, tokens, __v, avatar, ...result } = user;

      return result;
    }
    return null;
  }

  async login(
    data: LoginDto,
    response: Response,
  ): Promise<{ access_token: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, email, ...payload } = data;
    const validatedUser = await this.validateUser(email, password);
    if (!validatedUser)
      throw new BadRequestException('User does not exist or wrong credentials');

    const refreshToken = await this.createJwtToken(
      { ...validatedUser },
      'refresh',
    );

    // saving refresh token in the db
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 5);
    await this.userService.updateUser(
      {
        email,
      },
      { tokens: { refresh_token: hashedRefreshToken } },
    );

    // Set refreshToken as a cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });

    return {
      access_token: await this.createJwtToken({ ...validatedUser }, 'access'),
    };
  }

  async logout(req: Request, res: Response): Promise<HttpException> {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken)
      return new HttpException(
        {
          statusCode: HttpStatus.OK,
          message: 'Already logged out.',
          success: true,
        },
        HttpStatus.OK,
      );

    const decodedRefreshtoken: any = this.jwtService.decode(refreshToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...payload } = decodedRefreshtoken;
    const expirationDate = new Date(0);

    // removing refresh token in the db
    await this.userService.updateUser(
      {
        email: payload.email,
      },
      { tokens: { refresh_token: '' } },
    );

    res.cookie('refresh_token', '', {
      httpOnly: true,
      expires: expirationDate,
    });

    return new HttpException(
      {
        statusCode: HttpStatus.OK,
        message: 'User logged out successfully',
        success: true,
      },
      HttpStatus.OK,
    );
  }

  async restore(body: { email: string }) {
    const { email } = body;

    const user = await this.userService.findOneUser({ email });
    if (!user) throw new HttpException('Check your email!', HttpStatus.OK);

    const newPassword = await this.generateRandomPassword(8);
    const hashedPassword = await bcrypt.hash(newPassword, 8);

    await this.userService.updateUser({ email }, { password: hashedPassword });
    await this.mailService.sendEmail(
      { password: newPassword },
      'restore password',
      email,
    );

    throw new HttpException('Check your email!', HttpStatus.OK);
  }

  async generateRandomPassword(length: number): Promise<string> {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  async createJwtToken(
    payload: any,
    type: 'refresh' | 'access',
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn:
        type === 'refresh'
          ? this.configService.get('JWT_REFRESH_EXPIRESIN') / 1000
          : this.configService.get('JWT_EXPIRESIN'),
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async validateJwtToken(jwt: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(jwt, {
        secret: `${this.configService.get('JWT_SECRET')}`,
      });

      return decoded; // The token is valid, return the decoded payload
    } catch (error) {
      // If an error occurs during verification, it means the token is invalid
      return new UnauthorizedException('Invalid token.');
    }
  }

  async updateRefreshToken(
    req: Request,
    res: Response,
  ): Promise<{ access_token: string } | UnauthorizedException> {
    const refreshToken = req.cookies?.refresh_token;

    const decodedToken: any = this.jwtService.decode(refreshToken);
    const user = await this.userService.findOneUser({ _id: decodedToken._id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tokens, password, avatar, __v, ...payload } = user;

    const updatedRefreshToken = await this.createJwtToken(payload, 'refresh');
    const updatedAccessToken = await this.createJwtToken(payload, 'access');

    res.cookie('refresh_token', updatedRefreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });

    return { access_token: updatedAccessToken };
  }
}
