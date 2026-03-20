import { Provider } from '@prisma/client';

export interface CreateResponse {
  success: boolean;
  data: Partial<Provider>;
}
