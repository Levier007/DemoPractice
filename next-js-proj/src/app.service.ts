import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }
  getTest(): string {
    return 'guard test';
  }
  getTest2(): string {
    return 'interceptor test';
  }
}
