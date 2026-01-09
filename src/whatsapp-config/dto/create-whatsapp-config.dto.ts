import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateWhatsappConfigDto {
  @IsUUID()
  externalTenantId: string;

  @IsString()
  @IsNotEmpty()
  phoneNumberId: string;

  @IsString()
  @IsNotEmpty()
  wabaId: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
