import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  orderApiConfiguration,
  orderServiceConfiguration,
} from '@nx-microservice-docker/order-api/config-utils';
import { paymentServiceConfiguration } from '@nx-microservice-docker/payment-service/config-utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        orderApiConfiguration,
        orderServiceConfiguration,
        paymentServiceConfiguration,
      ],
    }),
  ],
})
export class PaymentServiceConfigFeatureModule {}
