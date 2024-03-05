import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { LoginGuard } from './guards/login.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* app.use(session({
    secret: 'lwt',
    resave: false,
    saveUninitialized: false
  })); */
  // app.useGlobalGuards(new LoginGuard());
  await app.listen(3000);
}
bootstrap();
