import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/email.config';
import validationSchema from './config/validation-schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/config/.env`,
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot(typeormConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
