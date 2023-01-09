import { FilterState } from '../../../domain/IState';
import { BrandType, CategoriesType, Product } from '../../../domain/model';
import { sourceData } from '../../../domain/source';
import { filterByBrand } from './filterBrand';
import { filterByCategory } from './filterCategory';
import { filterByPrice } from './filterPrice';
import { filterBySearch } from './filterSearch';
import { filterByStock } from './filterStock';

export const filterAllData = (state: FilterState): Product[] => {
  let filterAllData = sourceData;
  if (state.brand) {
    filterAllData = filterByBrand(state.brand, filterAllData);
  }
  if (state.category) {
    filterAllData = filterByCategory(state.category, filterAllData);
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
  return filterAllData;
};

export function filterBrandCategory(state: FilterState): Product[] {
  let filterAllData = sourceData;
  if (state.brand) {
    filterAllData = filterByBrand(state.brand, filterAllData);
  }
  if (state.category) {
    filterAllData = filterByCategory(state.category, filterAllData);
  }
  return filterAllData;
}

export { filterByBrand };
