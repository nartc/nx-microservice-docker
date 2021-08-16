import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  OrderServiceConfiguration,
  orderServiceConfiguration,
} from '@nx-microservice-docker/order-api/config-utils';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        useFactory: (orderServiceConfig: OrderServiceConfiguration) => ({
          transport: Transport.TCP,
          options: {
            host: orderServiceConfig.host,
            port: orderServiceConfig.port,
          },
        }),
        inject: [orderServiceConfiguration.KEY],
      },
    ]),
  ],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentServicePaymentDataAccessModule {}
