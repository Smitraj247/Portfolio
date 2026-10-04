import { Module } from '@nestjs/common';
import { ContactController, ContactThrottleGuard } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactThrottleGuard],
})
export class ContactModule {}
