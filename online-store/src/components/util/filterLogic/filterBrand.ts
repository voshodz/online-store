import { BrandType, Product } from '../../../domain/model';

export const filterByBrand = (brands: BrandType[], data: Product[]): Product[] => {
  //console.log(brands);
  if (brands.length === 0) {
    return data;
  }
  const filteredData = data.filter((product) => brands.includes(product.brand));
  return filteredData;
};
