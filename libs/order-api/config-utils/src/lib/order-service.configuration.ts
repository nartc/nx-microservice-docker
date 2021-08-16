import { ConfigType, registerAs } from '@nestjs/config';

export const orderServiceConfiguration = registerAs('orderService', () => ({
  host: process.env.ORDER_HOST || 'localhost',
  port: Number(process.env.ORDER_SERVICE_PORT) || 8876,
  domain: process.env.ORDER_SERVICE_DOMAIN || 'http://localhost:8876',
}));

export type OrderServiceConfiguration = ConfigType<
  typeof orderServiceConfiguration
>;
