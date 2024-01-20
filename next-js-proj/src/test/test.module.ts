import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService], // exports之后，引用该模块的就能注入 TestService了
})
export class TestModule {}
