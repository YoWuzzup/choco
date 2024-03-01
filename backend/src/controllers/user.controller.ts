import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AccessTokenGuard } from 'src/guards/jwt-auth.guard';

import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findOne(@Param('id') _id: ObjectId | string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.userService.findOneUser({
      _id,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, tokens, avatar, __v, ...userToSend } = user;

    return userToSend;
  }

  @UseGuards(AccessTokenGuard)
  @Post(':id/update')
  async updateUserInformation(
    @Param('id') _id: ObjectId | string,
    @Body() body: any,
  ) {
    const updatedUser = (
      await this.userService.updateUser({ _id }, body)
    ).toObject();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, tokens, avatar, __v, ...userToSend } = updatedUser;

    return userToSend;
  }

  @Post(':id/update-user-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUserAvatar(
    @Param('id') _id: ObjectId | string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.userService.updateUserAvatar(_id, file);

    return user;
  }

  // @Roles('admin') // Specify the roles allowed to access this route
  // @UseGuards(RolesGuard) // Apply the RolesGuard to this route
}
