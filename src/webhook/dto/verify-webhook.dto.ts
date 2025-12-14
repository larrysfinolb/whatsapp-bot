import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyWebhookDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'hub.mode' })
  mode: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'hub.verify_token' })
  verifyToken: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'hub.challenge' })
  challenge: string;
}
