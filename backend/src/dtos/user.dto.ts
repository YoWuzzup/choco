import { PartialType } from '@nestjs/mapped-types';

export class userDto {
  email: string;
  password: string;
  refresh_token: string;
}

export class UpdateUserDto extends PartialType(userDto) {}
