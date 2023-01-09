import { FilterState } from '../../../domain/IState';
import { BrandType, CategoriesType, Product } from '../../../domain/model';
import { sourceData } from '../../../domain/source';

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
  //будет много функции, которые "очищают" и фильтруют данные,
  //потом эти функции легко тестировать
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

const filterByBrand = (brands: BrandType[], data: Product[]): Product[] => {
  //console.log(brands);
  if (brands.length === 0) {
    return data;
  }
  const filteredData = data.filter((product) => brands.includes(product.brand));
  return filteredData;
};

const filterByCategory = (categories: CategoriesType[], data: Product[]): Product[] => {
  //console.log(brands);
  if (categories.length === 0) {
    return data;
  }
  const filteredData = data.filter((product) => categories.includes(product.category));
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
  const filterByTitle = data.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
  const filterBybrand = data.filter((product) => product.brand.toLowerCase().includes(search.toLowerCase()));
  const filterByCategory = data.filter((product) => product.category.toLowerCase().includes(search.toLowerCase()));
  const filterByPrice = data.filter((product) => product.price.toString().toLowerCase().includes(search.toLowerCase()));
  const filterByDiscountPrice = data.filter((product) =>
    ((product.price * (100 - product.discountPercentage)) / 100)
      .toFixed(2)
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const filterByRating = data.filter((product) =>
    product.rating.toString().toLowerCase().includes(search.toLowerCase())
  );
  const filteredSet: Set<Product> = new Set();
  filterByTitle.forEach((el) => filteredSet.add(el));
  filterBybrand.forEach((el) => filteredSet.add(el));
  filterByCategory.forEach((el) => filteredSet.add(el));
  filterByPrice.forEach((el) => filteredSet.add(el));
  filterByDiscountPrice.forEach((el) => filteredSet.add(el));
  filterByRating.forEach((el) => filteredSet.add(el));
  const filteredArray = new Array(...filteredSet);
  return filteredArray;
};
