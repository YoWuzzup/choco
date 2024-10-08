import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';

import { RegistrationDto } from 'src/dtos/authData.dto';
import { Users } from 'src/models/users.model';
import { MailService } from './mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private usersModel: Model<Users>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async findOneUser(idOrEmail: {
    email?: string;
    _id?: ObjectId | string;
  }): Promise<Users> | null {
    try {
      const user = await this.usersModel.findOne({
        $or: [{ _id: idOrEmail._id }, { email: idOrEmail.email }],
      });

      if (user) return user.toObject();

      return user;
    } catch (error) {
      return error;
    }
  }

  async registerUser(
    data: RegistrationDto,
    response: Response,
  ): Promise<unknown> {
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

    const newUser = new this.usersModel({
      ...restData,
      password: hashedPass,
    });
    const savedUser = await newUser.save();

    // send email with confirmation letter
    await this.mailService.sendEmail(
      {
        username: data.email,
        confirmationLink: `${this.configService.get(
          'FRONTEND_URL',
        )}/auth/email/confirmation/${savedUser._id}`,
      },
      'confirmation',
      data.email,
    );

    // use toObject() to remove mongoose data and get only user data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, tokens, avatar, __v, ...result } = savedUser.toObject();

    const refreshToken = await this.jwtService.signAsync(
      {
        ...result,
      },
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN') / 1000,
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    // replace dummy token with a normal one
    await this.updateUser(
      { _id: result._id },
      { tokens: { refresh_token: refreshToken } },
    );

    // Set refreshToken as a cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });

    return {
      access_token: await this.jwtService.signAsync(
        {
          ...result,
        },
        {
          expiresIn: this.configService.get('JWT_EXPIRESIN'),
          secret: this.configService.get('JWT_SECRET'),
        },
      ),
    };
  }

  async updateUser(
    idOrEmail: {
      email?: string;
      _id?: ObjectId | string;
    },
    updateUserDto: any,
  ) {
    try {
      return await this.usersModel
        .findOneAndUpdate(
          {
            $or: [{ _id: idOrEmail._id }, { email: idOrEmail.email }],
          },
          updateUserDto,
          {
            new: true,
          },
        )
        .exec();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email is already in use');
      } else {
        throw error;
      }
    }
  }

  async updateUserAvatar(_id: ObjectId | string, file: Express.Multer.File) {
    const user = await this.updateUser({ _id }, { avatar: file });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, ...userUnused } = user.toObject();

    return avatar;
  }

  async getUserAvatar(_id: ObjectId | string) {
    const user = await this.findOneUser({ _id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, ...userUnused } = user;

    return avatar;
  }
}
