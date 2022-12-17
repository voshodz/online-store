import { FilterState } from '../../../domain/IState';
import { BrandType, Product } from '../../../domain/model';
import { sourceData } from '../../../domain/source';

export const filterAllData = (state: FilterState): Product[] => {
  let filterAllData = sourceData;
  if (state.brand) {
    filterAllData = filterByBrand(state.brand, filterAllData);
  }
  if (state.price) {
    filterAllData = filterByPrice(state.price, filterAllData);
  }
  if (state.stock) {
    filterAllData = filterByStock(state.stock, filterAllData);
  }
  if (state.search) {
    filterAllData = filterBySearch(state.search, filterAllData);
  }
  //будет много функции, которые "очищают" и фильтруют данные,
  //потом эти функции легко тестировать
  return filterAllData;
};

const filterByBrand = (brands: BrandType[], data: Product[]): Product[] => {
  //console.log(brands);
  if (brands.length === 0) {
    return data;
  }
  const filteredData = data.filter((product) => brands.includes(product.brand));
  return filteredData;
};

const filterByPrice = (price: [number, number], data: Product[]): Product[] => {
  const filteredData = data.filter((product) => product.price >= price[0] && product.price <= price[1]);
  return filteredData;
};

const filterByStock = (stock: [number, number], data: Product[]): Product[] => {
  const filteredData = data.filter((product) => product.stock >= stock[0] && product.stock <= stock[1]);
  return filteredData;
};

const filterBySearch = (search: string, data: Product[]): Product[] => {
  const filteredData = data.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
  return filteredData;
};
