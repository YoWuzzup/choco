import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { AuthService } from 'src/serveces/auth.service';
import { UserService } from 'src/serveces/user.service';

import { LoginDto, RegistrationDto } from 'src/dtos/authData.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { RefreshJwtGuard } from 'src/guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() regData: RegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { password, email } = regData;

    return this.login({ password, email }, response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, ...data } =
      await this.authService.login(req);

    // Set refreshToken as a cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });

    return { accessToken: accessToken, ...data };
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
