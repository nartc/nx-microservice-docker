import { PaymentStatus } from '../enums';

export interface PaymentDetailsDto {
  orderId: string;
  status: PaymentStatus;
  transactionId: string;
}
