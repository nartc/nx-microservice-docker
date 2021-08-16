import { Module } from '@nestjs/common';
import { PaymentServicePaymentDataAccessModule } from '@nx-microservice-docker/payment-service/payment-data-access';
import { PaymentController } from './payment.controller';

@Module({
  imports: [PaymentServicePaymentDataAccessModule],
  controllers: [PaymentController],
})
export class PaymentServicePaymentFeatureModule {}
