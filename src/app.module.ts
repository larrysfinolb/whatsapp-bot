import { Module } from '@nestjs/common';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [WhatsappModule, WebhookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
