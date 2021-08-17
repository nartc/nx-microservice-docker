import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { OrderStatus } from '../enums';

@Schema({ timestamps: true })
export class Order {
  @Prop()
  @ApiProperty()
  amount: number;
  @Prop({ default: 'mock-user' })
  @ApiProperty()
  username: string;
  @Prop({ default: OrderStatus.created, enum: OrderStatus })
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: string;
  @ApiProperty()
  transactionId: string;
  @ApiProperty()
  id: string;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
