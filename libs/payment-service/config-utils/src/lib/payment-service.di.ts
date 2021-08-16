import { Inject } from '@nestjs/common';
import { paymentServiceConfiguration } from './payment-service.configuration';

export const InjectPaymentServiceConfig = () =>
  Inject(paymentServiceConfiguration.KEY);
