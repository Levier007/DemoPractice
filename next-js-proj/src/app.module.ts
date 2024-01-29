import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VipModule } from './vip/vip.module';
import { LoggerMiddleware } from './logger/logger.middleware';
@Module({
  imports: [UserModule, VipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 路由中间件，仅在user路由生效
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
{
}
