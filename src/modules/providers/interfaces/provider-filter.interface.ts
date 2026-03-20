import { Prisma } from '@prisma/client';

interface Pagination {
  take: number;
  skip: number;
}

export interface ProviderFilter {
  pagination?: Pagination;
  where?: Prisma.ProviderWhereInput;
  orderBy?:
    | Prisma.ProviderOrderByWithRelationInput
    | Prisma.ProviderOrderByWithRelationInput[];
  select?: Prisma.ProviderSelect;
}
