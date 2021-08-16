import { ConfigType, registerAs } from '@nestjs/config';

export const paymentServiceConfiguration = registerAs('paymentService', () => ({
  host: process.env.PAYMENT_SERVICE_HOST || 'localhost',
  port: Number(process.env.PAYMENT_SERVICE_PORT) || 8875,
  domain: process.env.PAYMENT_SERVICE_DOMAIN || 'http://localhost:8875',
}));

export type PaymentServiceConfiguration = ConfigType<
  typeof paymentServiceConfiguration
>;
