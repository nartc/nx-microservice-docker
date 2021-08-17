import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  orderServiceConfiguration,
  OrderServiceConfiguration,
} from '@nx-microservice-docker/order-api/config-utils';
import { OrderApiOrderDataAccessModule } from '@nx-microservice-docker/order-api/order-data-access';
import { OrderController } from './order.controller';

@Module({
  imports: [
    OrderApiOrderDataAccessModule,
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
  controllers: [OrderController],
})
export class OrderApiOrderFeatureModule {}
