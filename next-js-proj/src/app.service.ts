import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  constructor() {}

  async getHello() {
    const value = await this.redisClient.keys('*');
    console.log(value);

    return 'Hello World!';
  }
  getTest(): string {
    return 'guard test';
  }
  getTest2(): string {
    return 'interceptor test';
  }
}
