//надо подумать, заворачивать эти функции
//для дом манипуляции в класс, или просто функции
// будет получать отфильтрованные данные

import { Product } from '../../domain/model';

//после бизнес логики, и манипулировать домом для отрисовки
export const renderProducts = (products: Product[]) => {
  console.log('renderingProducts');
  const containerProducts = document.querySelector('.products-items');
  if (!containerProducts) {
    return;
  }
  console.log('rendering products');
  containerProducts.innerHTML = '';
  products.forEach((product) => {
    containerProducts.innerHTML += product.brand + ' ';
  });
  //какие то дом манипуляции
};
