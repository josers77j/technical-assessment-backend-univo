import { Provider } from '@prisma/client';

export interface ProviderTransformer {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsArray: Partial<Provider[]>;
}
