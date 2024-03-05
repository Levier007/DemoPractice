import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InvalidDataFilter } from '../invalidData.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'APP_FILTER',
      useClass: InvalidDataFilter,
    },
  ],
})
export class UserModule {}
