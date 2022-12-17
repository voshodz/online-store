import { FilterState, SortType } from '../../../domain/IState';
import { BrandType, CategoriesType } from '../../../domain/model';

export const urlGetState = (): FilterState | string => {
  const state: FilterState = {};
  const paramsString = window.location.href.slice(window.location.origin.length + 1); //включительно вопрос знак +1

  if (paramsString === '') {
    return 'root';
  }
  if (paramsString.slice(0, 6) === 'basket') {
    return 'basket';
  }
  const params = new URLSearchParams(paramsString);
  const arr: Array<string[]> = [];
  for (const p of params) {
    arr.push(p);
  }
  console.log(arr);
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

export const urlUpdateFromState = (state: FilterState) => {
  if (state.brand?.length === 0 && state.price && state.price[0] <= 1) {
    window.history.replaceState({}, '', `/`);
    return;
  }
  let urlQuery = '?';
  if (state.brand?.length !== 0) {
    urlQuery += 'brand=';
    state.brand?.forEach((brandValue) => {
      urlQuery += brandValue.toLowerCase() + '+';
    });
  }

  urlQuery = urlQuery.slice(0, -1);

  console.log(urlQuery);
  if (state.price && state.price[0] > 1) {
    urlQuery += '&' + 'price=';
    urlQuery += state.price[0] + '+' + state.price[1];
  }
  if (urlQuery[1] === '&') {
    urlQuery.replace('&', '');
  }
  window.history.replaceState({}, '', '?' + urlQuery.slice(1, urlQuery.length));
};

const urlParseBrand = (query: string): BrandType[] => {
  //TODO: parse categories correct
  const brandsArray = query.split(' ');
  const result: BrandType[] = [];
  brandsArray.forEach((brand) => {
    result.push((brand[0].toUpperCase() + brand.slice(1)) as BrandType);
  });
  return result;
};

const urlParseCategory = (query: string): CategoriesType[] => {
  //TODO: parse categories
  const result: CategoriesType[] = [];
  return result;
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
  //TODO: parse Sort type
  return SortType.default;
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
