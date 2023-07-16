import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'psql',
  port: 5432,
  username: 'sungminjo',
  password: '',
  database: 'user_service',
  synchronize: false,
  logging: true,
  entities: [`${__dirname}/**/*.entity.ts`],
  migrations: [`${__dirname}/**/migrations/*.ts`],
});
