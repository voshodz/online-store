import { FilterState } from '../../../domain/IState';

//export
export const parseBrand = (queryByBrand: string): string[] => {
  const query = queryByBrand.split('=')[1];
  const splittedArray = query.split('+');
  return splittedArray;
};

export const updateUrlFromState = (state: FilterState) => {
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
