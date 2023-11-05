import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

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
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: LoginDto) {
    return await this.authService.login(req);
  }

  @Post('register')
  async registerUser(@Body() regData: RegistrationDto) {
    return await this.userService.registerUser(regData);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
