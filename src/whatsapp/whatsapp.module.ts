import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
