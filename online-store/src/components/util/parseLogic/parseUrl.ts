import { FilterState, PageEnum, SortType } from '../../../domain/IState';
import { BrandArray, BrandType, CategoriesType, CategoryArray } from '../../../domain/model';

export const urlGetState = (): FilterState | string => {
  const state: FilterState = {};
  const paramsString = window.location.href.slice(window.location.origin.length + 1); //включительно вопрос знак +1

  if (paramsString === '') {
    return 'root';
  }
  if (paramsString === '?basket') {
    return 'basket';
  }
  if (paramsString.includes('basket')) {
    return '404';
  }
  const reg = /^\?details\/\d+$/i;
  console.log(reg.test(paramsString));
  if (reg.test(paramsString)) {
    return 'details';
  }
  const params = new URLSearchParams(paramsString);
  const arr: Array<string[]> = [];
  for (const p of params) {
    arr.push(p);
  }
  arr.forEach((item) => {
    switch (item[0]) {
      case 'brand':
        console.log('brand');
        state.brand = urlParseBrand(item[1]);
        break;
      case 'category':
        state.category = urlParseCategory(item[1]);
        break;
      case 'price':
        console.log('price');
        state.price = urlParsePrice(item[1]);
        break;
      case 'stock':
        state.stock = urlParseStock(item[1]);
        break;
      case 'sort':
        state.sort = urlParseSort(item[1]);
        break;
      case 'search':
        state.search = item[1];
        break;
      case 'big':
        state.big = urlParseBigMode(item[1]);
        break;
      default:
        break;
    }
  });
  console.log(state);
  return state;
};

const urlParseBrand = (query: string): BrandType[] => {
  //console.log('=> ' + query);
  const brandsQuerry = query.split(' ');
  const result: BrandType[] = [];
  brandsQuerry.forEach((brand) => {
    const index = getIndexOfBrand(brand);
    if (index >= 0) {
      result.push(BrandArray[index]); //TODO: если -1, следовательно неправильный параметр, надо как то 404 продумать
    }
  });
  return result;
};
const getIndexOfBrand = (param: string): number => {
  let index = -1;
  BrandArray.forEach((brand, indexInArray) => {
    if (brand.split(' ').join('').toLowerCase() === param) {
      index = indexInArray;
      return index;
    }
  });
  return index;
};

const urlParseCategory = (query: string): CategoriesType[] => {
  const categoryQuerry = query.split(' ');
  const result: CategoriesType[] = [];
  categoryQuerry.forEach((category) => {
    const index = getIndexOfCategory(category);
    if (index >= 0) {
      result.push(CategoryArray[index]); //TODO: если -1, следовательно неправильный параметр, надо как то 404 продумать
    }
  });
  return result;
};

const getIndexOfCategory = (param: string): number => {
  let index = -1;
  CategoryArray.forEach((category, indexInArray) => {
    if (category.split(' ').join('').toLowerCase() === param) {
      index = indexInArray;
      return index;
    }
  });
  return index;
};

const urlParsePrice = (query: string): [number, number] => {
  const price = query.split(' ');
  let result: [number, number] = [0, 2000];
  const min = Number(price[0]);
  const max = Number(price[1]);
  if (typeof min === 'number' && typeof max === 'number') {
    result = [min, max];
  }
  return result;
};

const urlParseStock = (query: string): [number, number] => {
  const price = query.split(' ');
  let result: [number, number] = [1, 150];
  const min = Number(price[0]);
  const max = Number(price[1]);
  if (typeof min === 'number' && typeof max === 'number') {
    result = [min, max];
  }
  return result;
};

const urlParseSort = (query: string): SortType => {
  switch (query) {
    case SortType.priceASC: {
      return SortType.priceASC;
    }
    case SortType.priceDESC: {
      return SortType.priceDESC;
    }
    case SortType.ratingASC: {
      return SortType.ratingASC;
    }
    case SortType.ratingDESC: {
      return SortType.ratingDESC;
    }
    default: {
      return SortType.default;
    }
  }
};

const urlParseBigMode = (query: string): boolean => {
  if (query === 'true') {
    return true;
  }
  if (query === 'false') {
    return false;
  }
  return false;
};

export const urlUpdateFromState = (state: FilterState) => {
  if (state.page && state.page === PageEnum.BasketPage) {
    window.history.replaceState({}, '', `/?basket`);
    return;
  }
  if (state.page && state.page === PageEnum.ProductDetailPage) {
    const query = window.location.href.slice(window.location.origin.length + 1);
    window.history.replaceState({}, '', query);
    return;
  }

  let urlQuery = '?';
  urlQuery += getQueryParamBrand(state.brand);
  urlQuery += getQueryParamCategory(state.category);
  urlQuery += getQueryParamPrice(state.price);
  urlQuery += getQueryParamStock(state.stock);
  urlQuery += getQueryParamSort(state.sort);
  urlQuery += getQueryParamBig(state.big);
  urlQuery += getQueryParamSearch(state.search);
  if (urlQuery[1] === '&') {
    urlQuery = urlQuery.replace('&', '');
  }
  if (urlQuery === '?') {
    window.history.replaceState({}, '', `/`);
    return;
  }
  window.history.replaceState({}, '', '?' + urlQuery.slice(1, urlQuery.length));
};

const checkDefaultState = (state: FilterState): boolean => {
  if (state.brand?.length === 0 && state.price && state.price[0] <= 10 && state.price[1] === 1749) {
    return true;
  }
  return false;
};

const getQueryParamBrand = (brand: BrandType[] | undefined): string => {
  let result = '';
  if (brand?.length !== 0 && brand) {
    result += '&brand=';
    brand?.forEach((brandValue) => {
      result += brandValue.split(' ').join('').toLowerCase() + '+';
    });
    result = result.slice(0, -1);
  }
  return result;
};

const getQueryParamCategory = (categories: CategoriesType[] | undefined): string => {
  let result = '';
  if (categories?.length !== 0 && categories) {
    result += '&category=';
    categories?.forEach((category) => {
      result += category.split(' ').join('').toLowerCase() + '+';
    });
    result = result.slice(0, -1);
  }
  return result;
};

const getQueryParamPrice = (price: [number, number] | undefined): string => {
  let result = '';
  if (price && (price[0] > 10 || price[1] < 1749)) {
    //это нужно чтобы хотя бы один ползунок был сдвигнут
    result += '&price=';
    result += price[0] + '+' + price[1];
  }
  return result;
};

const getQueryParamStock = (stock: [number, number] | undefined): string => {
  let result = '';
  if (stock && (stock[0] > 2 || stock[1] < 150)) {
    //это нужно чтобы хотя бы один ползунок был сдвигнут
    result += '&stock=';
    result += stock[0] + '+' + stock[1];
  }
  return result;
};

const getQueryParamSort = (sort: SortType | undefined): string => {
  let result = '';
  if (sort != SortType.default) {
    result = `&sort=${sort}`;
  }
  return result;
};

const getQueryParamBig = (big: boolean | undefined): string => {
  let result = '';
  if (big) {
    result = `&big=${big}`;
  }
  return result;
};

const getQueryParamSearch = (search: string | undefined): string => {
  let result = '';
  if (search && search !== '') {
    result += '&search=' + search;
  }
  return result;
};
