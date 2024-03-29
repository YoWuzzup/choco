import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

import { LoginDto, RegistrationDto } from 'src/dtos/authData.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { RefreshTokenGuard } from 'src/guards/refresh-jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() regData: RegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!regData.email || !regData.password || !regData.confirmPassword) {
      throw new BadRequestException('Missing required properties');
    }

    return await this.userService.registerUser(regData, response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(req, response);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @HttpCode(200)
  @Post('restore')
  async restore(@Body() body: { email: string }) {
    return await this.authService.restore(body);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async updateRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.updateRefreshToken(req, res);
  }
}
