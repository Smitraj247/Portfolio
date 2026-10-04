import { Module } from '@nestjs/common';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [PortfolioModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
