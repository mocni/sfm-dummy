import { join } from 'path';

import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { configKeyName } from './constants/config-key-name.constants';

const databaseConfig = () => ({
  autoLoadEntities: false,
  entities: [join(__dirname, '../**/*.{model,entity}.{ts,js}')],
  logging: true,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  type: 'postgres' as const,
  url: process.env.DB_URL,
});

export default registerAs(configKeyName.DATABASE, () => databaseConfig());
export const connectionSource = new DataSource(
  databaseConfig() as DataSourceOptions,
);
