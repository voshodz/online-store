//надо подумать, заворачивать эти функции
//для дом манипуляции в класс, или просто функции
// будет получать отфильтрованные данные

import { Product } from '../../domain/model';

//после бизнес логики, и манипулировать домом для отрисовки
export const renderProducts = (products: Product[]) => {
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

export function renderBrandCheckboxes(checkboxes: HTMLInputElement[]): void {
  const fragment: DocumentFragment = document.createDocumentFragment();
  checkboxes.forEach((elem) => {
    const brand: string = elem.value;
    const brandLabel: HTMLLabelElement = document.createElement('label');
    brandLabel.htmlFor = brand;
    brandLabel.textContent = brand;
    const brandItem: HTMLDivElement = document.createElement('div');
    brandItem.append(elem, brandLabel);
    brandItem.classList.add('brand__item');
    fragment.appendChild(brandItem);
  });
  const brandContainer = document.querySelector('.brand');
  if (brandContainer) {
    brandContainer.appendChild(fragment);
  }
}

export function renderCategoryCheckboxes(checkboxes: HTMLInputElement[]): void {
  const fragment: DocumentFragment = document.createDocumentFragment();
  checkboxes.forEach((elem) => {
    const brand: string = elem.value;
    const brandLabel: HTMLLabelElement = document.createElement('label');
    brandLabel.htmlFor = brand;
    brandLabel.textContent = brand;
    const brandItem: HTMLDivElement = document.createElement('div');
    brandItem.append(elem, brandLabel);
    brandItem.classList.add('category__item');
    fragment.appendChild(brandItem);
  });
  const brandContainer = document.querySelector('.category');
  if (brandContainer) {
    brandContainer.appendChild(fragment);
  }
}

export function createCheckboxes(arr: ReadonlyArray<string>): HTMLInputElement[] {
  const array: HTMLInputElement[] = [];
  arr.forEach((category) => {
    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.id = category;
    checkbox.value = category;
    checkbox.type = 'checkbox';
    array.push(checkbox);
  });

  return array;
}
