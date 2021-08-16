import { Module } from '@nestjs/common';
import { PaymentServiceConfigFeatureModule } from '@nx-microservice-docker/payment-service/config-feature';
import { PaymentServicePaymentFeatureModule } from '@nx-microservice-docker/payment-service/payment-feature';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PaymentServiceConfigFeatureModule,
    PaymentServicePaymentFeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
