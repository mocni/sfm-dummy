import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  entities: ['dist/**/*.{model,entity}.{ts,js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  type: 'postgres',
  url: process.env.DB_URL,
});
