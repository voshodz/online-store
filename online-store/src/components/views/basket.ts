export const renderBasket = (/* тут будет актуальное состояние как параметр*/) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  body.innerHTML = '';
  body.innerHTML = `<h1>Корзина покупок тут<h1>`;
};
