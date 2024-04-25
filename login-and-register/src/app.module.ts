import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/user/entities/user.entity';
import { Permission } from './modules/user/entities/permission.entity';
import { Role } from './modules/user/entities/role.entity';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from './modules/redis/redis.module';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.100.24.5',
      port: 3307,
      username: 'root',
      password: 'lee5672020',
      database: 'rbac_test',
      synchronize: true,
      logging: true,
      entities: [User, Role, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'lwt',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [
        path.join(process.cwd(), '.env.dev'),
        path.join(process.cwd(), '.env.prod'),
      ],
    }),
    UserModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
