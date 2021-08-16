/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  paymentServiceConfiguration,
  PaymentServiceConfiguration,
} from '@nx-microservice-docker/payment-service/config-utils';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const paymentServiceConfig = app.get<PaymentServiceConfiguration>(
    paymentServiceConfiguration.KEY
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: paymentServiceConfig.host,
      port: paymentServiceConfig.port,
    },
  });

  await app.startAllMicroservicesAsync().then(() => {
    Logger.log(
      `PaymentService started on ${paymentServiceConfig.host}:${paymentServiceConfig.port}`,
      'PaymentService'
    );
  });
}

bootstrap();
