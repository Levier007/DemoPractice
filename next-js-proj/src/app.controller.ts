import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test/test.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
  ) {}

  @Get()
  getHello(): string {
    // return this.testService.findAll();
    return this.appService.getHello();
  }
}
