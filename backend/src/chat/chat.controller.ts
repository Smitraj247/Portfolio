import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import type { ChatRequestDto } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  reply(@Body() body: ChatRequestDto) {
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    if (!message) {
      throw new BadRequestException('Please enter a message.');
    }
    if (message.length > 500) {
      throw new BadRequestException('Messages must be 500 characters or fewer.');
    }

    const history = Array.isArray(body.history)
      ? body.history
          .filter(
            (item) =>
              item &&
              (item.role === 'user' || item.role === 'assistant') &&
              typeof item.content === 'string',
          )
          .slice(-8)
          .map((item) => ({
            role: item.role,
            content: item.content.slice(0, 1000),
          }))
      : [];

    return this.chatService.reply(message, history);
  }
}
