import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWhatsappConfigDto } from './dto/create-whatsapp-config.dto';
import { UpdateWhatsappConfigDto } from './dto/update-whatsapp-config.dto';

@Injectable()
export class WhatsappConfigService {
  constructor(private prisma: PrismaService) {}

  async create(createWhatsappConfigDto: CreateWhatsappConfigDto) {
    return this.prisma.whatsappConfig.create({
      data: createWhatsappConfigDto,
    });
  }

  async update(
    whatsappConfigId: string,
    updateWhatsappConfigDto: UpdateWhatsappConfigDto,
  ) {
    return this.prisma.whatsappConfig.update({
      where: { id: whatsappConfigId },
      data: updateWhatsappConfigDto,
    });
  }

  async findOnePhoneNumberId(phoneNumberId: string) {
    return this.prisma.whatsappConfig.findFirst({
      where: { phoneNumberId, isActive: true, deletedAt: null },
    });
  }
}
