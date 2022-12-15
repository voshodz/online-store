//надо подумать, заворачивать эти функции
//для дом манипуляции в класс, или просто функции
// будет получать отфильтрованные данные

import { Product } from '../../domain/model';

//после бизнес логики, и манипулировать домом для отрисовки
export const renderProducts = (products: Product[]) => {
  console.log('renderingProducts');
  draw(products);
  //какие то дом манипуляции
};

function draw(products: Product[]) {
  const template: HTMLTemplateElement | null = document.querySelector('#card-template');
  const fragment: DocumentFragment = document.createDocumentFragment();

  products.forEach((item: Product) => {
    const cardClone: HTMLTemplateElement | null = template?.content.cloneNode(true) as HTMLTemplateElement;
    const cardImg: HTMLImageElement | null = cardClone.querySelector('.card__img > img');
    if (cardImg !== null) {
      cardImg.src = item.images[0];
    }
    const cardContent: HTMLElement | null = cardClone.querySelector('.card__content');
    if (cardContent !== null) {
      cardContent.innerHTML = 'Title: ' + item.title + '<br>';
      cardContent.innerHTML += 'Category: ' + item.category + '<br>';
      cardContent.innerHTML += 'Brand: ' + item.brand + '<br>';
      cardContent.innerHTML += 'Price: ' + item.price + '<br>';
      cardContent.innerHTML += 'Discount: ' + item.discountPercentage + '%<br>';
      cardContent.innerHTML += 'Rating: ' + item.rating + '<br>';
      cardContent.innerHTML += 'Stock: ' + item.stock + '<br>';
    }

    fragment.append(cardClone);
  });
  const containerProducts = document.querySelector('.products-items');
  if (containerProducts) {
    containerProducts.innerHTML = '';
    containerProducts.appendChild(fragment);
  }
}
