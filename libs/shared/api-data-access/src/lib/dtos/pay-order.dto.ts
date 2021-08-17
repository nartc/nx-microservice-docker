import { ApiProperty } from '@nestjs/swagger';

export class PayOrderDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  username: string;
}
