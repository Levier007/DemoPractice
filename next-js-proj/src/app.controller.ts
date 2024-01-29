import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  UseFilters,
  ParseIntPipe,
  Next,
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
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Next() next: any): string {
    console.log('handler');
    next();
    return this.appService.getHello();
  }
  @Get()
  getHello1(): string {
    return 'aaa';
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
}
