import { Module } from '@nestjs/common';
import { OrderApiConfigFeatureModule } from '@nx-microservice-docker/order-api/config-feature';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OrderApiConfigFeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
