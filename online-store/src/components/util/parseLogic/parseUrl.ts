import { FilterState } from '../../../domain/IState';

//export
export const parseBrand = (queryByBrand: string): string[] => {
  const query = queryByBrand.split('=')[1];
  const splittedArray = query.split('+');
  return splittedArray;
};

export const updateUrlFromState = (state: FilterState): string => {
  let brandQuery = '#?brand=';
  state.brand?.forEach((brandValue) => {
    brandQuery += brandValue.toLowerCase() + '+';
  });
  brandQuery = brandQuery.slice(0, -1);
  window.history.pushState({}, '', brandQuery);
  console.log(brandQuery);
  return '';
};
