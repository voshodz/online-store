//надо подумать, заворачивать эти функции
//для дом манипуляции в класс, или просто функции
// будет получать отфильтрованные данные

import { Product } from '../../domain/model';
import { sourceData } from '../../domain/source';

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
    const cardImgLink: HTMLLinkElement | null = cardClone.querySelector('.card__img');
    if (cardImgLink !== null) {
      cardImgLink.href = `?details/${item.id}`;
    }
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

export function renderBrandCheckboxes(checkboxes: HTMLInputElement[], filteredData?: Product[]): void {
  const fragment: DocumentFragment = document.createDocumentFragment();
  checkboxes.forEach((elem) => {
    const brand: string = elem.value;
    const brandLabel: HTMLLabelElement = document.createElement('label');
    brandLabel.htmlFor = brand;
    brandLabel.textContent = brand;
    const brandItem: HTMLDivElement = document.createElement('div');
    brandItem.append(elem, brandLabel);
    brandItem.classList.add('brand__checkbox');
    const brandNumber: HTMLDivElement = document.createElement('div');
    brandNumber.classList.add('brand__count');
    if (filteredData != undefined) {
      const currentCount: number = filteredData.filter((el) => el.brand.toLowerCase() == brand.toLowerCase()).length;
      const allCount: number = sourceData.filter((el) => el.brand.toLowerCase() == brand.toLowerCase()).length;
      brandNumber.textContent = `(${currentCount}/${allCount})`;
    }
    const brandContent: HTMLDivElement = document.createElement('div');
    brandContent.classList.add('brand__item');
    brandContent.append(brandItem, brandNumber);
    fragment.appendChild(brandContent);
  });
  const brandContainer = document.querySelector('.brand__content');
  if (brandContainer) {
    brandContainer.innerHTML = '';
    brandContainer.appendChild(fragment);
  }
}

export function renderCategoryCheckboxes(checkboxes: HTMLInputElement[], filteredData?: Product[]): void {
  const fragment: DocumentFragment = document.createDocumentFragment();
  checkboxes.forEach((elem) => {
    const category: string = elem.value;
    const brandLabel: HTMLLabelElement = document.createElement('label');
    brandLabel.htmlFor = category;
    brandLabel.textContent = category;
    const brandItem: HTMLDivElement = document.createElement('div');
    brandItem.append(elem, brandLabel);
    brandItem.classList.add('category__checkbox');
    const brandNumber: HTMLDivElement = document.createElement('div');
    brandNumber.classList.add('category__count');
    if (filteredData != undefined) {
      const currentCount: number = filteredData.filter((el) => el.category.toLowerCase() == category.toLowerCase())
        .length;
      const allCount: number = sourceData.filter((el) => el.category.toLowerCase() == category.toLowerCase()).length;
      brandNumber.textContent = `(${currentCount}/${allCount})`;
    }
    const brandContent: HTMLDivElement = document.createElement('div');
    brandContent.classList.add('category__item');
    brandContent.append(brandItem, brandNumber);
    fragment.appendChild(brandContent);
  });
  const brandContainer = document.querySelector('.category__content');
  if (brandContainer) {
    brandContainer.innerHTML = '';
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
