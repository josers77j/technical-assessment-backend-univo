import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepository } from '../repositories/product.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  const productRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductRepository,
          useValue: productRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should persist and return success response', async () => {
    const payload: CreateProductDto = {
      name: 'Laptop',
      price: '1299.99',
      providerId: 1,
    };
    const product = { id: 1, ...payload };

    productRepositoryMock.create.mockResolvedValue(product);

    await expect(service.create(payload)).resolves.toEqual({
      success: true,
      data: product,
    });
    expect(productRepositoryMock.create).toHaveBeenCalledWith(payload);
  });

  it('findAll should apply filters and return transformed pagination response', async () => {
    const query: ProductFilterDto = {
      page: 1,
      limit: 10,
      filter: 'lap',
      fields: { id: true, name: true },
      sort: [{ name: 'asc' }],
      priceMin: '100.00',
      priceMax: '2000.00',
    };

    productRepositoryMock.findAll.mockResolvedValue({
      products: [{ id: 1, name: 'Laptop' }],
      totalItems: 1,
    });

    const response = await service.findAll(query);

    expect(productRepositoryMock.findAll).toHaveBeenCalledWith(
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
      itemsArray: [{ id: 1, name: 'Laptop' }],
    });
  });

  it('findOneById should return product when found', async () => {
    const product = { id: 1, name: 'Laptop' };
    productRepositoryMock.findOneById.mockResolvedValue(product);

    await expect(service.findOneById(1)).resolves.toEqual(product);
  });

  it('findOneById should throw NotFoundException when missing', async () => {
    productRepositoryMock.findOneById.mockResolvedValue(null);

    await expect(service.findOneById(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('update should validate existence and return success response', async () => {
    const payload: UpdateProductDto = {
      name: 'Laptop Pro',
      price: '1499.99',
    };

    productRepositoryMock.findOneById.mockResolvedValue({
      id: 1,
      name: 'Laptop',
    });
    productRepositoryMock.update.mockResolvedValue({ id: 1, ...payload });

    await expect(service.update(1, payload)).resolves.toEqual({
      success: true,
      data: { id: 1, ...payload },
    });
    expect(productRepositoryMock.update).toHaveBeenCalledWith(1, payload);
  });

  it('remove should validate existence and delete product', async () => {
    productRepositoryMock.findOneById.mockResolvedValue({
      id: 1,
      name: 'Laptop',
    });
    productRepositoryMock.remove.mockResolvedValue(undefined);

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(productRepositoryMock.remove).toHaveBeenCalledWith(1);
  });
});
