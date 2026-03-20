import { ProductRaw } from '../interfaces/product-raw.interface';
import type { ProductTransformer } from '../interfaces/product-transformer.interface';

export function ProductTransformer(
  providerRaw: ProductRaw,
): ProductTransformer {
  const { pagination, totalItems, products } = providerRaw;

  const totalPages = Math.ceil(totalItems / pagination.limit!);

  const response = {
    currentPage: pagination.page!,
    totalPages,
    totalItems,
    itemsArray: products,
  };

  return response;
}
