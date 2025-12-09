import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VerifyWebhookDto } from './dto/verify-webhook.dto';
import { WhatsappService } from './whatsapp.service';
import { HandleIncomingDto } from './dto/handle-incoming';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get()
  verifyWebhook(@Query() verifyWebhookDto: VerifyWebhookDto) {
    return this.whatsappService.verifyWebhook(verifyWebhookDto);
  }

  @Post()
  handleIncoming(@Body() handleIncomingDto: HandleIncomingDto) {
    return this.whatsappService.handleIncoming(handleIncomingDto);
  }
}
