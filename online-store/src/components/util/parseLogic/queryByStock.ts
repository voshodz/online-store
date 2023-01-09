export const getQueryParamStock = (stock: [number, number] | undefined): string => {
  let result = '';
  if (stock && (stock[0] > 2 || stock[1] < 150)) {
    result += '&stock=';
    result += stock[0] + '+' + stock[1];
  }
  return result;
};
