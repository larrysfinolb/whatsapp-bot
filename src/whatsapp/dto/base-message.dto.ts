import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class BaseMessageDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{1,15}$/, {
    message:
      'The "to" field must be a valid phone number in international format without the "+" sign.',
  })
  to: string;
}
