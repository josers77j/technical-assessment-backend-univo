import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersService } from './providers.service';
import { ProviderRepository } from '../repository/provider.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';
import { ProviderFilterDto } from '../dto/provider-filter.dto';

describe('ProvidersService', () => {
  let service: ProvidersService;
  const providerRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        {
          provide: ProviderRepository,
          useValue: providerRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should persist and return success response', async () => {
    const payload: CreateProviderDto = {
      name: 'Acme',
      email: 'acme@test.com',
    };
    const provider = { id: 1, ...payload };

    providerRepositoryMock.create.mockResolvedValue(provider);

    await expect(service.create(payload)).resolves.toEqual({
      success: true,
      data: provider,
    });
    expect(providerRepositoryMock.create).toHaveBeenCalledWith(payload);
  });

  it('findAll should apply filters and return transformed pagination response', async () => {
    const query: ProviderFilterDto = {
      page: 1,
      limit: 10,
      filter: 'acme',
      fields: { id: true, name: true },
      sort: [{ name: 'asc' }],
    };

    providerRepositoryMock.findAll.mockResolvedValue({
      providers: [{ id: 1, name: 'Acme' }],
      totalItems: 1,
    });

    const response = await service.findAll(query);

    expect(providerRepositoryMock.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        pagination: { take: 10, skip: 0 },
        orderBy: [{ name: 'asc' }],
        select: { id: true, name: true },
      }),
    );
    expect(response).toEqual({
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
      itemsArray: [{ id: 1, name: 'Acme' }],
    });
  });

  it('findOneById should return provider when found', async () => {
    const provider = { id: 1, name: 'Acme' };
    providerRepositoryMock.findOneById.mockResolvedValue(provider);

    await expect(service.findOneById(1)).resolves.toEqual(provider);
  });

  it('findOneById should throw NotFoundException when missing', async () => {
    providerRepositoryMock.findOneById.mockResolvedValue(null);

    await expect(service.findOneById(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('update should validate existence and return success response', async () => {
    const payload: UpdateProviderDto = {
      name: 'Acme Updated',
    };

    providerRepositoryMock.findOneById.mockResolvedValue({
      id: 1,
      name: 'Acme',
    });
    providerRepositoryMock.update.mockResolvedValue({ id: 1, ...payload });

    await expect(service.update(1, payload)).resolves.toEqual({
      success: true,
      data: { id: 1, ...payload },
    });
    expect(providerRepositoryMock.update).toHaveBeenCalledWith(1, payload);
  });

  it('remove should validate existence and delete provider', async () => {
    providerRepositoryMock.findOneById.mockResolvedValue({
      id: 1,
      name: 'Acme',
    });
    providerRepositoryMock.remove.mockResolvedValue(undefined);

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(providerRepositoryMock.remove).toHaveBeenCalledWith(1);
  });
});
