import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { ProviderFilter } from '../interfaces/provider-filter.interface';

@Injectable()
export class ProviderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(filter: ProviderFilter) {
    const { pagination, where, ...rest } = filter;

    const totalItems = await this.prismaService.provider.count({
      where,
    });

    const providers = await this.prismaService.provider.findMany({
      where,
      ...rest,
      skip: pagination?.skip,
      take: pagination?.take,
    });
    const response = {
      providers,
      totalItems,
    };

    return response;
  }
}
