import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';

export class ProviderFilterDto extends PartialType(PaginationDto) {
  // add provider filters here
}
