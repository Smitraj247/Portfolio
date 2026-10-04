import {
  Body,
  CanActivate,
  Controller,
  ExecutionContext,
  Injectable,
  Post,
  TooManyRequestsException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactThrottleGuard implements CanActivate {
  private readonly attempts = new Map<string, { count: number; resetAt: number }>();
  private readonly windowMs = 15 * 60 * 1000;
  private readonly maxAttempts = 5;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const ip = request.ip || request.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const current = this.attempts.get(ip);

    if (!current || current.resetAt <= now) {
      this.attempts.set(ip, { count: 1, resetAt: now + this.windowMs });
      return true;
    }
    if (current.count >= this.maxAttempts) {
      throw new TooManyRequestsException(
        'Too many contact requests. Please try again in 15 minutes.',
      );
    }

    current.count += 1;
    if (this.attempts.size > 1000) {
      for (const [key, entry] of this.attempts) {
        if (entry.resetAt <= now) this.attempts.delete(key);
      }
    }
    return true;
  }
}

@Controller('contact')
@UseGuards(ContactThrottleGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }
}
