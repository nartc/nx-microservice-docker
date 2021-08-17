import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OrderDocument } from './schemas';

@WebSocketGateway({ cors: true })
export class OrderGateway {
  @WebSocketServer()
  wss: Server;

  newOrderAdded(payload: OrderDocument): void {
    this.wss.emit('newOrderAdded', payload);
  }

  orderStatusUpdated(payload: OrderDocument): void {
    this.wss.emit('orderStatusUpdated', payload);
  }
}
