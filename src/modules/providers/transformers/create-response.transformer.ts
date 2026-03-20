import { Provider } from '@prisma/client';
import type { CreateResponse } from '../interfaces/create-response.interface';

export function CreateResponseTransformer(
  provider: Partial<Provider>,
): CreateResponse {
  return {
    success: true,
    data: provider,
  };
}
