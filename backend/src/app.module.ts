import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { ChatModule } from './chat/chat.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ResumeModule } from './resume/resume.module';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [PortfolioModule, ContactModule, ResumeModule, ChatModule],
})
export class AppModule {}
