import { CategoriesType, Product } from '../../../domain/model';

export const filterByCategory = (categories: CategoriesType[], data: Product[]): Product[] => {
  if (categories.length === 0) {
    return data;
  }
  const filteredData = data.filter((product) => categories.includes(product.category));
  return filteredData;
};
