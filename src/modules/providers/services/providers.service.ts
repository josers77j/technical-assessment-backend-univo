import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';
import { ProviderFilterDto } from '../dto/provider-filter.dto';
import { ProviderRepository } from '../repositories/provider.repository';
import { ProviderFilter } from '../interfaces/provider-filter.interface';
import { ProviderTransformer } from '../transformers/provider.transformer';
import { CreateResponseTransformer } from '../transformers/create-response.transformer';

@Injectable()
export class ProvidersService {
  constructor(private readonly providerRepository: ProviderRepository) {}
  async create(createProviderDto: CreateProviderDto) {
    const provider = await this.providerRepository.create(createProviderDto);
    return CreateResponseTransformer(provider);
  }

  async findAll(providerFilterDto: ProviderFilterDto) {
    const { page, limit, sort, fields, filter } = providerFilterDto;
    const providerFilter: ProviderFilter = {};

    providerFilter.pagination = { take: limit!, skip: (page! - 1) * limit! };
    if (sort !== null) providerFilter.orderBy = sort;
    if (fields !== null) providerFilter.select = fields;

    if (filter !== undefined)
      providerFilter.where = {
        OR: [
          {
            name: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            phone: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      };

    const provider = await this.providerRepository.findAll(providerFilter);
    return ProviderTransformer({ ...provider, pagination: { page, limit } });
  }

  async findOneById(id: number) {
    const provider = await this.providerRepository.findOneById(id);

    if (!provider) throw new NotFoundException('provider not found');

    return provider;
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    await this.findOneById(id);

    const provider = await this.providerRepository.update(
      id,
      updateProviderDto,
    );

    return CreateResponseTransformer(provider);
  }

  async remove(id: number) {
    await this.findOneById(id);

    await this.providerRepository.remove(id);
  }
}
