import { Prisma } from '@prisma/client';

interface Pagination {
  take: number;
  skip: number;
}

export interface ProductFilter {
  pagination?: Pagination;
  where?: Prisma.ProductWhereInput;
  orderBy?:
    | Prisma.ProductOrderByWithRelationInput
    | Prisma.ProductOrderByWithRelationInput[];
  select?: Prisma.ProductSelect;
}
