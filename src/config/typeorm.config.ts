import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'user_service',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
  logging: true,
};
