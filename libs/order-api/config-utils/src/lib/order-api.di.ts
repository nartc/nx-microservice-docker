import { Inject } from '@nestjs/common';
import { orderApiConfiguration } from './order-api.configuration';

export const InjectOrderApiConfig = () => Inject(orderApiConfiguration.KEY);
