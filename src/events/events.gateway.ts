import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateWay {
  @SubscribeMessage('message')
  handleEvent(@MessageBody() body: any) {
    console.log(body);
  }
}
