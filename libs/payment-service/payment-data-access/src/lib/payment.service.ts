import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentStatus } from '@nx-microservice-docker/payment-service/payment-data-access';
import { PaymentDetailsDto, PayOrderDto } from './dto';

let canceledPayments: string[] = [];

@Injectable()
export class PaymentService {
  private readonly logger = new Logger('Payment Service');

  constructor(@Inject('ORDER_SERVICE') private orderService: ClientProxy) {}

  initiatePayment(order: PayOrderDto): string {
    const payment: PaymentDetailsDto = {
      orderId: order.id,
      status: PaymentStatus.declined,
      transactionId: Date.now().toString(),
    };

    if (order.status !== 'created') throw 'Wrong Order Status';

    if (Math.random() * 10 >= 4) payment.status = PaymentStatus.confirmed;

    // assume this is a multi step process, so when it is done we emit an event
    setTimeout(async () => {
      if (canceledPayments.find((x) => x == payment.transactionId)) {
        canceledPayments = canceledPayments.filter(
          (x) => x == payment.transactionId
        );
        return;
      }
      this.logger.log(
        `Processed payment: ${payment.transactionId} w/ status ${payment.status}`
      );
      this.orderService.emit('paymentProcessed', payment);
    }, Math.floor(Math.random() * 2 + 1) * 3000);

    return payment.transactionId;
  }

  cancelPayment(transactionId: string) {
    this.logger.log(`Cancel payment: ${transactionId}`);
    canceledPayments.push(transactionId);
  }
}
