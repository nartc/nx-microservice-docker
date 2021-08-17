import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { PaymentService } from '@nx-microservice-docker/payment-service/payment-data-access';
import { PayOrderDto } from '@nx-microservice-docker/shared/api-data-access';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @MessagePattern('initiatePayment')
  async initiatePayment(order: PayOrderDto): Promise<string> {
    return this.paymentService.initiatePayment(order);
  }

  @EventPattern('paymentCanceled')
  async paymentCanceled(transactionId: string) {
    this.paymentService.cancelPayment(transactionId);
  }
}
