import { Injectable, Inject } from '@nestjs/common';
import { TestService } from './test/test.service';

@Injectable()
export class AppService {
  constructor(private readonly testService: TestService) {}

  getHello(): string {
    return 'Hello World!' + '   ' + this.testService.findAll(); //这里调用test模块的findAll方法;
  }
}
