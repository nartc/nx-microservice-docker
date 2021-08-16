import { Module } from '@nestjs/common';
import { PaymentServiceConfigFeatureModule } from '@nx-microservice-docker/payment-service/config-feature';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PaymentServiceConfigFeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
