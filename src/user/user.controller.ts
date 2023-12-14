import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { userInfo } from 'os';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(FileInterceptor('file'))
export class UserController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Post()
  create(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    this.eventEmitter.emit('created_user', data);
    return User.save(data);
  }

  @Get()
  async getAll() {
    const data = await User.find();
    return data;
  }

  @Get(':id')
  getUserById(@Param('id') id) {
    return User.findOneOrFail(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    console.log(id);
    return User.delete(id);
  }

  async signIn(username: string, password: string) {
    const user = await User.find({ where: { username: username } });

    // TODO: Generate a JWT and return it here
    // instead of the user object
    console.log(user);
  }
}
