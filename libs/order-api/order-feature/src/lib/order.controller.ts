import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateOrderDto,
  Order,
  OrderService,
  OrderStatus,
} from '@nx-microservice-docker/order-api/order-data-access';
import { PaymentDetailsDto } from '@nx-microservice-docker/shared/api-data-access';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy
  ) {}

  @Get()
  @ApiOkResponse({ type: () => Order, isArray: true })
  index(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: () => Order })
  async create(@Body() createOrderDto: CreateOrderDto) {
    if (!createOrderDto || !createOrderDto.amount || createOrderDto.amount <= 0)
      throw new BadRequestException();

    try {
      const order = await this.orderService.create(createOrderDto);
      this.orderClient.emit('orderCreated', order.id);
      return order;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: () => Order })
  async details(@Param('id') id: string) {
    if (!id) throw new BadRequestException();

    const order = await this.orderService.findById(id);
    if (!order) throw new NotFoundException();

    return order;
  }

  @Get(':id/status')
  @ApiOkResponse({ type: String })
  async status(@Param('id') id: string) {
    if (!id) throw new BadRequestException();

    const order = await this.orderService.findById(id);
    if (!order) throw new NotFoundException();

    return order.status;
  }

  @Post(':id/cancel')
  @ApiOkResponse({ type: () => Order })
  async cancel(@Param('id') id: string) {
    try {
      return await this.orderService.cancel(id);
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  @EventPattern('orderCreated')
  async orderCreated(id: string) {
    await this.orderService.initiatePayment(id);
  }

  @EventPattern('paymentProcessed')
  async paymentProcessed(data: PaymentDetailsDto) {
    const order = await this.orderService.updatePaymentStatus(data);

    if (order && order.status == OrderStatus.confirmed)
      this.orderClient.emit('orderConfirmed', order.id);
  }

  @EventPattern('orderConfirmed')
  async orderConfirmed(id: string) {
    await this.orderService.deliver(id);
  }
}
