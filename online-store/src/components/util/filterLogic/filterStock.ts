import { Product } from '../../../domain/model';

export const filterByStock = (stock: [number, number], data: Product[]): Product[] => {
  const filteredData = data.filter((product) => product.stock >= stock[0] && product.stock <= stock[1]);
  return filteredData;
};
