import { ProviderRaw } from '../interfaces/provider-raw.interface';
import type { ProviderTransformer } from '../interfaces/provider-transformer.interface';

export function ProviderTransformer(
  providerRaw: ProviderRaw,
): ProviderTransformer {
  const { pagination, totalItems, providers } = providerRaw;

  const totalPages = Math.ceil(totalItems / pagination.limit!);

  const response = {
    currentPage: pagination.page!,
    totalPages,
    totalItems,
    itemsArray: providers,
  };

  return response;
}
