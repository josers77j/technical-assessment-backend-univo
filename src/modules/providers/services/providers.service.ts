import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';
import { ProviderFilterDto } from '../dto/provider-filter.dto';
import { ProviderRepository } from '../repository/provider.repository';
import { ProviderFilter } from '../interfaces/provider-filter.interface';

@Injectable()
export class ProvidersService {
  constructor(private readonly providerRepository: ProviderRepository) {}
  create(createProviderDto: CreateProviderDto) {
    return 'This action adds a new provider';
  }

  async findAll(providerFilterDto: ProviderFilterDto) {
    const { page, limit, sort, fields, filter } = providerFilterDto;
    const providerFilter: ProviderFilter = {};

    providerFilter.pagination = { take: limit!, skip: (page! - 1) * limit! };
    if (sort !== null) providerFilter.orderBy = sort;
    if (fields !== null) providerFilter.select = fields;
    console.log(filter);

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

    console.log(providerFilter.where);

    const provider = await this.providerRepository.findAll(providerFilter);
    return provider;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
