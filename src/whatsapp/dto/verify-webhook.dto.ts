import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class VerifyWebhookDto {
  @Expose({ name: 'hub.mode' })
  @IsString()
  mode: string;

  @Expose({ name: 'hub.verify_token' })
  @IsString()
  verifyToken: string;

  @Expose({ name: 'hub.challenge' })
  @IsString()
  challenge: string;
}
