import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
import { RefreshTokenGuard } from 'src/guards/refresh-jwt-auth.guard';
import { AccessTokenGuard } from 'src/guards/jwt-auth.guard';
// import { AuthGuard } from '@nestjs/passport';
// import { AccessTokenStrategy } from 'src/strategies/jwt-strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('1')
  async test() {
    return 0;
  }

  @Post('register')
  async registerUser(@Body() regData: RegistrationDto) {
    if (!regData.email || !regData.password || !regData.confirmPassword) {
      throw new BadRequestException('Missing required properties');
    }

    return await this.userService.registerUser(regData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(req, response);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
