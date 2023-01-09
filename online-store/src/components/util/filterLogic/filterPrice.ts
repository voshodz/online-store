import { Product } from '../../../domain/model';

export const filterByPrice = (price: [number, number], data: Product[]): Product[] => {
  const filteredData = data.filter((product) => product.price >= price[0] && product.price <= price[1]);
  return filteredData;
};
