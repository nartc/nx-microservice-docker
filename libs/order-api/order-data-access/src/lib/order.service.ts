import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaymentDetailsDto,
  PaymentStatus,
  PayOrderDto,
} from '@nx-microservice-docker/shared/api-data-access';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dtos';
import { OrderStatus } from './enums';
import { OrderGateway } from './order.gateway';
import { Order, OrderDocument } from './schemas';

@Injectable()
export class OrderService {
  constructor(
    @Inject('PAYMENT_SERVICE') private paymentService: ClientProxy,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private orderGateway: OrderGateway
  ) {}

  async findAll(): Promise<OrderDocument[]> {
    return await this.orderModel
      .find()
      .sort({ createdAt: 'descending' })
      .exec();
  }

  async findById(id: string): Promise<OrderDocument> {
    return await this.orderModel.findById(id).exec();
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    const order = new this.orderModel(createOrderDto);
    this.orderGateway.newOrderAdded(order);
    return await order.save();
  }

  async initiatePayment(id: string) {
    const order = await this.findById(id);

    const payOrderDto = new PayOrderDto();
    payOrderDto.id = order.id;
    payOrderDto.status = order.status;
    payOrderDto.amount = order.amount;
    payOrderDto.username = order.username;

    this.paymentService
      .send('initiatePayment', payOrderDto)
      .subscribe(async (transactionId) => {
        order.transactionId = transactionId;
        await order.save();
      });
  }

  async updatePaymentStatus(data: PaymentDetailsDto): Promise<OrderDocument> {
    const order = await this.findById(data.orderId);

    if (!order || order.status !== OrderStatus.created) return;

    switch (data.status) {
      case PaymentStatus.confirmed:
        order.status = OrderStatus.confirmed;
        break;
      case PaymentStatus.declined:
        order.status = OrderStatus.canceled;
        break;

      default:
        break;
    }
    this.orderGateway.orderStatusUpdated(order);
    return await order.save();
  }

  async cancel(id: string): Promise<OrderDocument> {
    const order = await this.findById(id);
    switch (order.status) {
      case OrderStatus.confirmed:
      case OrderStatus.created:
        order.status = OrderStatus.canceled;
        this.paymentService.emit('paymentCanceled', order.transactionId);
        this.orderGateway.orderStatusUpdated(order);
        break;

      default:
        throw 'Cannot cancel due to wrong status';
    }
    return await order.save();
  }

  async deliver(id: string) {
    setTimeout(async () => {
      const order = await this.findById(id);

      if (order.status !== OrderStatus.confirmed)
        throw 'Cannot deliver due to wrong status';

      order.status = OrderStatus.delivered;
      this.orderGateway.orderStatusUpdated(order);
      await order.save();
    }, Math.floor(Math.random() * 3 + 1) * 3000);
  }
}
