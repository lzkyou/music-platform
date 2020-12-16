import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

let usersNum: number = 0;
//NestJS WebSocket网关
@WebSocketGateway(3003)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  //logger 在Nest控制台输出
  private logger: Logger = new Logger('socket')

  //socket.io
  @WebSocketServer() server: Server;

  //服务端订阅事件
  @SubscribeMessage('events')
  connect(client: any, payload: any): string {
    return '已连接!';
  }

  @SubscribeMessage('msgToServer')
  message(client: Socket, obj: any) {
    //服务端发送广播事件，客户端sockets类中直接监听'msgToClient'可获取消息
    client.broadcast.emit('msgToClient', {sender: 'other', msg: obj.msg, time: obj.time})
  }

  //状态监听
  handleConnection(client: Socket, ...args: any[]) {
    // this.logger.log(`客户端连接：${client.id}`)
    usersNum++
    this.server.emit('users', `在线人数：${usersNum}`)
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`客户端断开连接：${client.id}`)
    usersNum--
    this.server.emit('users', `在线人数：${usersNum}`)
  }

}
