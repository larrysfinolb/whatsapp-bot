import { Module } from '@nestjs/common';
import { WhatsappConfigService } from './whatsapp-config.service';
import { WhatsappConfigController } from './whatsapp-config.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [WhatsappConfigService, PrismaService],
  controllers: [WhatsappConfigController],
  exports: [WhatsappConfigService],
})
export class WhatsappConfigModule {}
