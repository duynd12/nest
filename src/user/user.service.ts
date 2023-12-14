import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  @Cron('* * * * 1 *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }

  @OnEvent('created_user')
  handleOrderCreatedEvent(payload: any) {
    console.log('Line 16', payload);
  }
}
