import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { VerifyWebhookDto } from './dto/verify-webhook.dto';
import { envs } from 'src/config';
import { BotService } from 'src/bot/bot.service';
import { HandleIncomingWebhookDto } from './dto/handle-incoming-webhook';
import { MESSAGE_TYPE } from 'src/common/enums/whatsapp.enum';
import { ERROR_CODES } from 'src/common/enums/error-codes.enum';
import { WhatsappConfigService } from 'src/whatsapp-config/whatsapp-config.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly botService: BotService,
    private readonly whatsappConfigService: WhatsappConfigService,
  ) {}

  verifyWebhook(verifyWebhookDto: VerifyWebhookDto) {
    const { mode, verifyToken, challenge } = verifyWebhookDto;
    const myVerifyToken = envs.whatsappCloudApi.verifyToken;

    if (!mode || !verifyToken || !challenge) {
      throw new BadRequestException({
        message: 'Missing mode, verifyToken or challenge in the request',
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    if (mode === 'subscribe' && verifyToken === myVerifyToken) {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Webhook verified successfully');
      return challenge;
    } else {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Webhook verification failed. Token received:', verifyToken);
      throw new ForbiddenException({
        message: 'Invalid verify token',
        code: ERROR_CODES.AUTH_INVALID_TOKEN,
      });
    }
  }

  async handleIncomingWebhook(
    handleIncomingWebhookDto: HandleIncomingWebhookDto,
  ) {
    const entries = handleIncomingWebhookDto.entry;

    try {
      for (const entry of entries) {
        const changes = entry.changes;
        for (const change of changes) {
          const value = change.value;
          if (!value || !value.messages) continue;

          const businessPhoneNumberId = value.metadata?.phone_number_id;
          if (!businessPhoneNumberId) continue;

          const whatsappConfig =
            await this.whatsappConfigService.findOnePhoneNumberId(
              businessPhoneNumberId,
            );
          if (!whatsappConfig) continue;

          const messages = value.messages;
          for (const message of messages) {
            if (message.type === MESSAGE_TYPE.TEXT) {
              const from = message.from;
              const body = message.text?.body;

              if (!from || !body) continue;

              await this.botService.handleMessage(
                from,
                body,
                whatsappConfig.accessToken,
                businessPhoneNumberId,
              );
            }
          }
        }
      }
    } catch (error) {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Error processing webhook event:', error.stack);
    }
  }
}
