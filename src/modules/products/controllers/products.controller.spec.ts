import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  const productsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call service.create', async () => {
    const payload: CreateProductDto = {
      name: 'Laptop',
      price: '1299.99',
      providerId: 1,
    };
    const response = { success: true, data: { id: 1, ...payload } };

    productsServiceMock.create.mockResolvedValue(response);

    await expect(controller.create(payload)).resolves.toEqual(response);
    expect(productsServiceMock.create).toHaveBeenCalledWith(payload);
  });

  it('findAll should call service.findAll', async () => {
    const query: ProductFilterDto = {
      page: 1,
      limit: 10,
      filter: 'lap',
    };
    const response = {
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
      itemsArray: [{ id: 1, name: 'Laptop' }],
    };

    productsServiceMock.findAll.mockResolvedValue(response);

    await expect(controller.findAll(query)).resolves.toEqual(response);
    expect(productsServiceMock.findAll).toHaveBeenCalledWith(query);
  });

  it('findOne should call service.findOneById', async () => {
    const response = { id: 1, name: 'Laptop' };
    productsServiceMock.findOneById.mockResolvedValue(response);

    await expect(controller.findOne(1)).resolves.toEqual(response);
    expect(productsServiceMock.findOneById).toHaveBeenCalledWith(1);
  });

  it('update should call service.update', async () => {
    const payload: UpdateProductDto = {
      name: 'Laptop Pro',
      price: '1499.99',
    };
    const response = { success: true, data: { id: 1, ...payload } };

    productsServiceMock.update.mockResolvedValue(response);

    await expect(controller.update(1, payload)).resolves.toEqual(response);
    expect(productsServiceMock.update).toHaveBeenCalledWith(1, payload);
  });

  it('remove should call service.remove', async () => {
    productsServiceMock.remove.mockResolvedValue(undefined);

    await expect(controller.remove(1)).resolves.toBeUndefined();
    expect(productsServiceMock.remove).toHaveBeenCalledWith(1);
  });
});
