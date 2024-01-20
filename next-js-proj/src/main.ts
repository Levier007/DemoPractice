import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 注意要给 create 方法传入 NestExpressApplication 的泛型参数才有 useStaticAssets这些方法
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
