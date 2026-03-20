import { Test, TestingModule } from '@nestjs/testing';
import { ProviderRepository } from './provider.repository';
import { PrismaService } from './../../../prisma/service/prisma.service';
import { ProviderFilter } from '../interfaces/provider-filter.interface';

describe('ProviderRepository', () => {
  let repository: ProviderRepository;

  const prismaServiceMock = {
    provider: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderRepository,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    repository = module.get<ProviderRepository>(ProviderRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll should call count and findMany', async () => {
    const filter: ProviderFilter = {
      pagination: { take: 10, skip: 0 },
      where: { name: { contains: 'acme' } },
      orderBy: [{ name: 'asc' }],
      select: { id: true, name: true },
    };

    prismaServiceMock.provider.count.mockResolvedValue(1);
    prismaServiceMock.provider.findMany.mockResolvedValue([
      { id: 1, name: 'Acme' },
    ]);

    const result = await repository.findAll(filter);

    expect(prismaServiceMock.provider.count).toHaveBeenCalledWith({
      where: filter.where,
    });
    expect(prismaServiceMock.provider.findMany).toHaveBeenCalledWith({
      where: filter.where,
      orderBy: filter.orderBy,
      select: filter.select,
      skip: 0,
      take: 10,
    });
    expect(result).toEqual({
      providers: [{ id: 1, name: 'Acme' }],
      totalItems: 1,
    });
  });

  it('findOneById should query provider with products include', async () => {
    prismaServiceMock.provider.findUnique.mockResolvedValue({
      id: 1,
      name: 'Acme',
      products: [],
    });

    await repository.findOneById(1);

    expect(prismaServiceMock.provider.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { products: true },
    });
  });

  it('create should call prisma provider.create', async () => {
    const payload = {
      name: 'Acme',
      email: 'acme@test.com',
    };

    prismaServiceMock.provider.create.mockResolvedValue({ id: 1, ...payload });

    const result = await repository.create(payload);

    expect(prismaServiceMock.provider.create).toHaveBeenCalledWith({
      data: payload,
    });
    expect(result).toEqual({ id: 1, ...payload });
  });

  it('update should call prisma provider.update', async () => {
    const payload = { name: 'Acme Updated' };

    prismaServiceMock.provider.update.mockResolvedValue({ id: 1, ...payload });

    const result = await repository.update(1, payload);

    expect(prismaServiceMock.provider.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: payload,
    });
    expect(result).toEqual({ id: 1, ...payload });
  });

  it('remove should call prisma provider.delete', async () => {
    prismaServiceMock.provider.delete.mockResolvedValue({ id: 1 });

    await repository.remove(1);

    expect(prismaServiceMock.provider.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
