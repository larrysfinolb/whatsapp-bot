import { ForbiddenException, Injectable } from '@nestjs/common';
import { VerifyWebhookDto } from './dto/verify-webhook.dto';
import { envs } from 'src/config';

@Injectable()
export class WebhookService {
  verifyWebhook(verifyWebhookDto: VerifyWebhookDto) {
    const mode = verifyWebhookDto.mode;
    const verifyToken = verifyWebhookDto.verifyToken;
    const challenge = verifyWebhookDto.challenge;

    const myVerifyToken = envs.whatsappCloudApi.verifyToken;

    if (!mode || !verifyToken) {
      throw new Error('Missing mode or verifyToken');
    }

    if (mode === 'subscribe' && verifyToken === myVerifyToken) {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Webhook verified successfully');

      return challenge;
    } else {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Webhook verification failed. Token received:', verifyToken);
      throw new ForbiddenException('Token verification failed');
    }
  }
}
