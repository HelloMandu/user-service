import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'user_service',
  host: 'psql',
  port: 5432,
  username: 'sungminjo',
  password: '',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: false,
  logging: true,
  migrations: [`${__dirname}/../**/migrations/*.{js,ts}`],
};
