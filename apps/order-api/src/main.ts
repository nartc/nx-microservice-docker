import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  orderApiConfiguration,
  OrderApiConfiguration,
  orderServiceConfiguration,
  OrderServiceConfiguration,
} from '@nx-microservice-docker/order-api/config-utils';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const orderApiConfig = app.get<OrderApiConfiguration>(
    orderApiConfiguration.KEY
  );
  const orderServiceConfig = app.get<OrderServiceConfiguration>(
    orderServiceConfiguration.KEY
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: orderServiceConfig.host,
      port: orderServiceConfig.port,
    },
  });

  await app.startAllMicroservicesAsync().then(() => {
    Logger.log(
      `Order Service started on ${orderServiceConfig.host}:${orderServiceConfig.port}`,
      'OrderService'
    );
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Order API')
    .setDescription('API documentation for Order API')
    .setVersion('1.0.0')
    .addServer(`${orderApiConfig.domain}`, 'Development API')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup('api/docs', app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
  Logger.log(
    `Swagger Docs enabled: ${orderApiConfig.domain}/${globalPrefix}/docs`,
    'NestApplication'
  );

  app.use('/robots.txt', (_, res) => {
    res.send('User-Agent: *\n' + 'Disallow: /');
  });
  app.use('/favicon.ico', (_, res) => {
    res.sendStatus(HttpStatus.NO_CONTENT).end();
  });

  await app.listen(orderApiConfig.port, () => {
    Logger.log(
      'Listening at ' + orderApiConfig.domain + '/' + globalPrefix,
      'NestApplication'
    );
  });
}

bootstrap();
