import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  UseGuards,
  ValidationPipe,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from '../../guards/login.guard';
import { PermissionGuard } from '../../guards/permission.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user);
    // 保存用户权限至token
    const foundUserPermissions = await this.userService.findByUsername(
      foundUser.username,
    );
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
          permissions: foundUserPermissions.permissions,
        },
      });
      res.setHeader('Authorization', 'Bearer ' + token);
      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Get('test')
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', 'create_aaa')
  test() {
    return 'test';
  }

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done';
  }
}
