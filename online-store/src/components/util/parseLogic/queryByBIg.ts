export const getQueryParamBig = (big: boolean | undefined): string => {
  let result = '';
  if (big) {
    result = `&big=${big}`;
  }
  return result;
};
