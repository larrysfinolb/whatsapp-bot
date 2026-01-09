import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { BotModule } from 'src/bot/bot.module';
import { WhatsappConfigModule } from 'src/whatsapp-config/whatsapp-config.module';

@Module({
  imports: [BotModule, WhatsappConfigModule],
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhookModule {}
