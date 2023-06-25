import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { HealthCheckController } from './health-check/health-check.controller';
import authConfig from './config/auth.config';
import emailConfig from './config/email.config';
import validationSchema from './config/validation-schema';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/config/.env`,
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot(typeormConfig),
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
