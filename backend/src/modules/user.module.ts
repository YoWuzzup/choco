import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/models/users.model';

import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/serveces/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
