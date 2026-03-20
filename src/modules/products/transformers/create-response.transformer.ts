import { Product } from '@prisma/client';
import { CreateResponse } from '../interfaces/create-response.interface';

export function CreateResponseTransformer(
  product: Partial<Product>,
): CreateResponse {
  return {
    success: true,
    data: product,
  };
}
