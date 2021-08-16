import { Inject } from '@nestjs/common';
import { orderServiceConfiguration } from './order-service.configuration';

export const InjectOrderServiceConfiguration = () =>
  Inject(orderServiceConfiguration.KEY);
