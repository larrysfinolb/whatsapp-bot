import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWhatsappConfigDto } from './dto/create-whatsapp-config.dto';
import { WhatsappConfigService } from './whatsapp-config.service';
import { UpdateWhatsappConfigDto } from './dto/update-whatsapp-config.dto';

@Controller('whatsapp-config')
export class WhatsappConfigController {
  constructor(private readonly whatsappConfigService: WhatsappConfigService) {}

  @Post()
  create(@Body() createWhatsappConfigDto: CreateWhatsappConfigDto) {
    return this.whatsappConfigService.create(createWhatsappConfigDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWhatsappConfigDto: UpdateWhatsappConfigDto,
  ) {
    return this.whatsappConfigService.update(id, updateWhatsappConfigDto);
  }
}
