import { CategoriesType } from '../../../domain/model';

export const getQueryParamCategory = (categories: CategoriesType[] | undefined): string => {
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
