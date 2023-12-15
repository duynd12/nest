import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import * as bcrypt from 'bcrypt';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(FileInterceptor('file'))
export class UserController {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await User.findOneOrFail({ where: { username: username } });
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @UseGuards(AuthGuardGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(RoleGuard, AuthGuardGuard)
  create(@Body() data: any) {
    // data.password = bcrypt.hashSync(data.password, 10);
    // this.eventEmitter.emit('created_user', data);
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
}
