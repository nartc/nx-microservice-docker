import { ConfigType, registerAs } from '@nestjs/config';

export const dbConfiguration = registerAs('db', () => ({
  uri: process.env.DB_URI || 'mongodb://localhost:27017/',
  name: process.env.DB_NAME || 'order-management',
}));

export type DbConfiguration = ConfigType<typeof dbConfiguration>;
