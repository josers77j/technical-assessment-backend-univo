import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from '../services/providers.service';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { ProviderFilterDto } from '../dto/provider-filter.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';

describe('ProvidersController', () => {
  let controller: ProvidersController;
  const providersServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [
        {
          provide: ProvidersService,
          useValue: providersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProvidersController>(ProvidersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call service.create', async () => {
    const payload: CreateProviderDto = {
      name: 'Acme',
      email: 'acme@test.com',
    };
    const response = { success: true, data: { id: 1, ...payload } };

    providersServiceMock.create.mockResolvedValue(response);

    await expect(controller.create(payload)).resolves.toEqual(response);
    expect(providersServiceMock.create).toHaveBeenCalledWith(payload);
  });

  it('findAll should call service.findAll', async () => {
    const query: ProviderFilterDto = {
      page: 1,
      limit: 10,
      filter: 'acme',
    };
    const response = {
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
      itemsArray: [{ id: 1, name: 'Acme' }],
    };

    providersServiceMock.findAll.mockResolvedValue(response);

    await expect(controller.findAll(query)).resolves.toEqual(response);
    expect(providersServiceMock.findAll).toHaveBeenCalledWith(query);
  });

  it('findOneById should call service.findOneById', async () => {
    const response = { id: 1, name: 'Acme' };
    providersServiceMock.findOneById.mockResolvedValue(response);

    await expect(controller.findOneById(1)).resolves.toEqual(response);
    expect(providersServiceMock.findOneById).toHaveBeenCalledWith(1);
  });

  it('update should call service.update', async () => {
    const payload: UpdateProviderDto = {
      name: 'Acme Updated',
    };
    const response = { success: true, data: { id: 1, ...payload } };

    providersServiceMock.update.mockResolvedValue(response);

    await expect(controller.update(1, payload)).resolves.toEqual(response);
    expect(providersServiceMock.update).toHaveBeenCalledWith(1, payload);
  });

  it('remove should call service.remove', async () => {
    providersServiceMock.remove.mockResolvedValue(undefined);

    await expect(controller.remove(1)).resolves.toBeUndefined();
    expect(providersServiceMock.remove).toHaveBeenCalledWith(1);
  });
});
