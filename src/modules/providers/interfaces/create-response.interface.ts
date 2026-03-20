import { Product } from '@prisma/client';

export interface CreateResponse {
  success: boolean;
  data: Partial<Product>;
}
