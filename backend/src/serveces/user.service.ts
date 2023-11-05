import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { RegistrationDto } from 'src/dtos/authData.dto';
import { Users } from 'src/models/users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async findOneUser(idOrEmail: {
    email?: string;
    _id?: ObjectId | string;
  }): Promise<Users> | null {
    try {
      const user = await this.usersModel.findOne({
        $or: [{ _id: idOrEmail._id }, { email: idOrEmail.email }],
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data: RegistrationDto): Promise<unknown> {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.findOneUser({ email: data.email });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...restData } = data;

    const hashedPass = await bcrypt.hash(data.password, 8);
    const newUser = new this.usersModel({ ...restData, password: hashedPass });

    const savedUser = await newUser.save();

    // use toObject() to remove mongoose data and get only user data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = savedUser.toObject();

    return result;
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return await this.userRepo.update(id, updateUserDto);
  // }
}
