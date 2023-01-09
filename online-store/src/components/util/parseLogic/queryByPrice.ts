export const getQueryParamPrice = (price: [number, number] | undefined): string => {
  let result = '';
  if (price && (price[0] > 10 || price[1] < 1749)) {
    result += '&price=';
    result += price[0] + '+' + price[1];
  }
  return result;
};
