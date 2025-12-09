import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TextDto } from './text.dto';

enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

export class MessageDto {
  @IsString()
  from: string;

  @IsString()
  id: string;

  @IsString()
  timestamp: string;

  @IsEnum(MessageType)
  type: MessageType;

  @IsOptional()
  @ValidateNested()
  @Type(() => TextDto)
  text?: TextDto;
}
