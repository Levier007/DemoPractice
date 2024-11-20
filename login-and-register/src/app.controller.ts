import { Controller, Get, Inject, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get()
  getHello(@Headers() headers: string): object {
    console.log('headers111', headers);
    // return this.appService.getHello();
    return {
      aaa: this.configService.get('a'),
      bbb: this.configService.get('b'),
    };
  }
}
