import { BrandType } from '../../../domain/model';

export const getQueryParamBrand = (brand: BrandType[] | undefined): string => {
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
