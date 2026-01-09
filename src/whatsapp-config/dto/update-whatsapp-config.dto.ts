import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateWhatsappConfigDto } from './create-whatsapp-config.dto';

export class UpdateWhatsappConfigDto extends PartialType(
  OmitType(CreateWhatsappConfigDto, ['externalTenantId'] as const),
) {}
