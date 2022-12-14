import { FilterState } from '../../../domain/IState';
import { BrandType, Product } from '../../../domain/model';
import { sourceData } from '../../../domain/source';

export const filterAllData = (state: FilterState): Product[] => {
  let filterAllData = sourceData;
  if (state.brandType) {
    filterAllData = filterByBrand(state.brandType, filterAllData);
  }
  //будет много функции, которые "очищают" и фильтруют данные,
  //потом эти функции легко тестировать
  return filterAllData;
};

const filterByBrand = (brands: BrandType[], data: Product[]): Product[] => {
  console.log(brands);
  return data;
};
