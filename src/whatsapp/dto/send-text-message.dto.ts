import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseMessageDto } from './base-message.dto';

export class SendTextMessageDto extends BaseMessageDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsBoolean()
  @IsOptional()
  previewUrl?: boolean = false;
}
