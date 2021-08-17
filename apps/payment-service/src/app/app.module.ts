import { Module } from '@nestjs/common';
import { PaymentServiceConfigFeatureModule } from '@nx-microservice-docker/payment-service/config-feature';
import { PaymentServicePaymentFeatureModule } from '@nx-microservice-docker/payment-service/payment-feature';

@Module({
  imports: [
    PaymentServiceConfigFeatureModule,
    PaymentServicePaymentFeatureModule,
  ],
})
export class AppModule {}
