import { PartialType } from '@nestjs/mapped-types';
import { ObjectId } from 'mongoose';

export class userDto {
  email: string;
  password: string;
  tokens: {
    refresh_token: string;
  };
}

export class returnUserDto {
  _id: ObjectId | string;
  email: string;
}

export class UpdateUserDto extends PartialType(userDto) {}
