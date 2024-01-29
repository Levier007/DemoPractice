import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { LoginGuard } from './login/login.guard';
import { TestFilter } from './test.filter';
import { TestException } from './testException';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 全局中间件---路由中间件详见app.module文件
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('before', req.url);
    next();
    console.log('after');
  });
  // 添加全局守卫
  // app.useGlobalGuards(new LoginGuard());
  app.useGlobalFilters(new TestFilter());
  // 注意要给 create 方法传入 NestExpressApplication 的泛型参数才有 useStaticAssets这些方法
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
