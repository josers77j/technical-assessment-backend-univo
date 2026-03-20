import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../../prisma/service/prisma.service';
import { ProviderFilter } from '../interfaces/provider-filter.interface';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';

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

  async findOneById(id: number) {
    return await this.prismaService.provider.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
  }

  async create(createProviderDto: CreateProviderDto) {
    return await this.prismaService.provider.create({
      data: {
        ...createProviderDto,
      },
    });
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    return await this.prismaService.provider.update({
      where: { id },
      data: {
        ...updateProviderDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.provider.delete({
      where: { id },
    });
  }
}
