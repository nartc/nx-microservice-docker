import { ConfigType, registerAs } from '@nestjs/config';

export const orderApiConfiguration = registerAs('orderApi', () => ({
  host: process.env.ORDER_API_HOST || 'localhost',
  port: Number(process.env.ORDER_API_PORT) || 8877,
  domain: process.env.ORDER_API_DOMAIN || 'http://localhost:8877',
}));

export type OrderApiConfiguration = ConfigType<typeof orderApiConfiguration>;
