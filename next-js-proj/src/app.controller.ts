import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  UseFilters,
  ParseIntPipe,
  Next,
  Inject,
  Session,
  Res,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login/login.guard';
import { TimeInterceptor } from './time/time.interceptor';
import { ValidatePipe } from './validate/validate.pipe';
import { TestFilter } from './test.filter';
import { TestException } from './testException';
import { Roles } from './role.decorator';
import { Role } from './role';
import { MyDecorator } from './MyDecoretor';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getHello(@Next() next: any) {
    console.log('handler');
    next();
    return await this.appService.getHello();
  }

  @Get('test')
  @Roles(Role.Admin) // 角色装饰器
  @UseGuards(LoginGuard)
  getTest(): string {
    return this.appService.getTest();
  }

  @Get('test2')
  @UseInterceptors(TimeInterceptor)
  getTest2(): string {
    return this.appService.getTest2();
  }

  @Get('test3')
  @UseFilters(TestFilter)
  getTest3(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }

  @Get('error')
  getTest4(): string {
    throw new TestException('aaa');
  }

  @Get('test5')
  getTest5(@MyDecorator('carNums', ParseIntPipe) carNums: number) {
    return carNums;
  }

  @Get('sss')
  sss(@Session() session) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('jwt')
  jwt(
    @Headers('Authorization') authorization: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (authorization) {
      try {
        console.log(authorization);

        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);
        console.log(data);

        const newToken = this.jwtService.sign({
          count: data.count + 1,
        });
        response.setHeader('token', newToken);
        return data.count + 1;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1,
      });

      response.setHeader('token', newToken);
      return 1;
    }
  }

  @Get('needLogin')
  @UseGuards(LoginGuard)
  needLogin() {
    return 'needLogin';
  }
}
