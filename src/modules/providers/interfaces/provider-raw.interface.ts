import { Provider } from '@prisma/client';
import { PaginationDto } from 'src/modules/shared/dtos/pagination.dto';

export interface ProviderRaw {
  providers: Partial<Provider[]>;
  totalItems: number;
  pagination: PaginationDto;
}
