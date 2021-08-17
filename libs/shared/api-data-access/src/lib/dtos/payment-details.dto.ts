import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../enums';

export class PaymentDetailsDto {
  constructor(orderId: string) {
    this.orderId = orderId;
    this.status = PaymentStatus.declined;
    this.transactionId = Math.round(Math.random() * 999999).toString();
  }

  @ApiProperty()
  orderId: string;

  @ApiProperty({ enum: () => PaymentStatus, enumName: 'PaymentStatus' })
  status: PaymentStatus;

  @ApiProperty()
  transactionId: string;
}
