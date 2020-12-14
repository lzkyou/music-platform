import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(3003)
export class EventsGateway {
  @WebSocketServer() server;

  @SubscribeMessage('events')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
