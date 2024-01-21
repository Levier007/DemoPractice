import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VipModule } from './vip/vip.module';

@Module({
  imports: [UserModule, VipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
