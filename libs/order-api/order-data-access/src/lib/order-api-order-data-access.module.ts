import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentServiceConfiguration,
  paymentServiceConfiguration,
} from '@nx-microservice-docker/payment-service/config-utils';
import { OrderGateway } from './order.gateway';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_SERVICE',
        useFactory: (paymentServiceConfig: PaymentServiceConfiguration) => ({
          transport: Transport.TCP,
          options: {
            host: paymentServiceConfig.host,
            port: paymentServiceConfig.port,
          },
        }),
        inject: [paymentServiceConfiguration.KEY],
      },
    ]),
  ],
  providers: [OrderService, OrderGateway],
  exports: [OrderService],
})
export class OrderApiOrderDataAccessModule {}
