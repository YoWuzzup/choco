import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AccessTokenGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(LocalAuthGuard)
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findOne(@Param('id') _id: ObjectId | string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, tokens, ...user } = await this.userService.findOneUser({
      _id,
    });

    return user;
  }

  // @Roles('admin') // Specify the roles allowed to access this route
  // @UseGuards(RolesGuard) // Apply the RolesGuard to this route
}
