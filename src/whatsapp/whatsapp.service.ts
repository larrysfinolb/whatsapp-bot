import { ForbiddenException, Injectable } from '@nestjs/common';
import { VerifyWebhookDto } from './dto/verify-webhook.dto';
import { envs } from 'src/config';
import { HandleIncomingDto } from './dto/handle-incoming';

@Injectable()
export class WhatsappService {
  verifyWebhook(verifyWebhookDto: VerifyWebhookDto) {
    const { mode, verifyToken, challenge } = verifyWebhookDto;

    if (
      mode === 'subscribe' &&
      verifyToken === envs.whatsappCloudApi.webhookVerifyToken
    ) {
      return challenge;
    }

    throw new ForbiddenException();
  }

  handleIncoming(handleIncomingDto: HandleIncomingDto) {
    console.log('Received WhatsApp incoming payload:', handleIncomingDto);
  }
}
