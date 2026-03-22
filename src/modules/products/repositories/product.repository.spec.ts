import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import { PrismaService } from './../../../prisma/service/prisma.service';
import { ProductFilter } from '../interfaces/product-filter.interface';

describe('ProductRepository', () => {
  let repository: ProductRepository;

  const prismaServiceMock = {
    product: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll should call count and findMany', async () => {
    const filter: ProductFilter = {
      pagination: { take: 10, skip: 0 },
      where: { name: { contains: 'lap' } },
      orderBy: [{ name: 'asc' }],
      select: { id: true, name: true },
    };

    prismaServiceMock.product.count.mockResolvedValue(1);
    prismaServiceMock.product.findMany.mockResolvedValue([
      { id: 1, name: 'Laptop' },
    ]);

    const result = await repository.findAll(filter);

    expect(prismaServiceMock.product.count).toHaveBeenCalledWith({
      where: filter.where,
    });
    expect(prismaServiceMock.product.findMany).toHaveBeenCalledWith({
      take: 10,
      skip: 0,
      where: filter.where,
      orderBy: filter.orderBy,
      select: filter.select,
    });
    expect(result).toEqual({
      products: [{ id: 1, name: 'Laptop' }],
      totalItems: 1,
    });
  });

  it('findOneById should call prisma product.findUniqueOrThrow', async () => {
    prismaServiceMock.product.findUniqueOrThrow.mockResolvedValue({
      id: 1,
      name: 'Laptop',
    });

    await repository.findOneById(1);

    expect(prismaServiceMock.product.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { provider: true },
    });
  });

  it('create should call prisma product.create', async () => {
    const payload = {
      name: 'Laptop',
      price: '1299.99',
      providerId: 1,
    };

    prismaServiceMock.product.create.mockResolvedValue({ id: 1, ...payload });

    const result = await repository.create(payload);

    expect(prismaServiceMock.product.create).toHaveBeenCalledWith({
      data: payload,
    });
    expect(result).toEqual({ id: 1, ...payload });
  });

  it('update should call prisma product.update', async () => {
    const payload = {
      name: 'Laptop Pro',
      price: '1499.99',
    };

    prismaServiceMock.product.update.mockResolvedValue({ id: 1, ...payload });

    const result = await repository.update(1, payload);

    expect(prismaServiceMock.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: payload,
    });
    expect(result).toEqual({ id: 1, ...payload });
  });

  it('remove should call prisma product.delete', async () => {
    prismaServiceMock.product.delete.mockResolvedValue({ id: 1 });

    await repository.remove(1);

    expect(prismaServiceMock.product.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
