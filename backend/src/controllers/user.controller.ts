import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

import { UserService } from 'src/serveces/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // example of couple useguards
  @UseGuards(LocalAuthGuard)
  // @UseGuards(AccessTokenGuard)
  @Roles('admin') // Specify the roles allowed to access this route
  @UseGuards(RolesGuard) // Apply the RolesGuard to this route
  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(@Param('id') _id: ObjectId | string) {
    return this.userService.findOneUser({ _id });
  }
}
