import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';
import { ProvidersService } from '../services/providers.service';
import { ProviderFilterDto } from '../dto/provider-filter.dto';

@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a provider',
    description: 'Creates a new provider record.',
  })
  @ApiBody({ type: CreateProviderDto })
  @ApiOkResponse({ description: 'Provider created successfully.' })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List providers',
    description:
      'Returns providers with optional pagination, search, sorting, and field selection.',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Case-insensitive text search over provider fields.',
    example: 'tech',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Comma-separated sort fields. Prefix with - for desc.',
    example: 'name,-createdAt',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    description: 'Comma-separated response fields.',
    example: 'id,name,email',
  })
  @ApiOkResponse({ description: 'Providers retrieved successfully.' })
  findAll(@Query() providerFilterDto: ProviderFilterDto) {
    return this.providersService.findAll(providerFilterDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get provider by id',
    description: 'Returns a single provider by its identifier.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Provider retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Provider not found.' })
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update provider',
    description: 'Updates one or more provider fields.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateProviderDto })
  @ApiOkResponse({ description: 'Provider updated successfully.' })
  @ApiNotFoundResponse({ description: 'Provider not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete provider',
    description: 'Deletes a provider by id.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Provider deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Provider not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.providersService.remove(id);
  }
}
