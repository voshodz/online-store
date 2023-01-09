//надо подумать, заворачивать эти функции
//для дом манипуляции в класс, или просто функции
// будет получать отфильтрованные данные

import { BASKET_MANAGER } from '../..';
import { Product } from '../../domain/model';
import { sourceData } from '../../domain/source';

//после бизнес логики, и манипулировать домом для отрисовки
export const renderProducts = (products: Product[]) => {
  if (products.length > 0) {
    draw(products);
  } else {
    const containerProducts = document.querySelector('.products-items');
    if (containerProducts) containerProducts.textContent = 'No products found';
  }
  renderProductFound(products);
  //какие то дом манипуляции
};

function renderProductFound(products: Product[]) {
  const foundElem: HTMLSpanElement | null = document.querySelector('#foundCount');
  if (foundElem) {
    const count: number = products.length;
    foundElem.textContent = `Found: ${count}`;
  }
}

function draw(products: Product[]) {
  const template: HTMLTemplateElement | null = document.querySelector('#card-template');
  const fragment: DocumentFragment = document.createDocumentFragment();

  products.forEach((item: Product) => {
    const cardClone: HTMLTemplateElement | null = template?.content.cloneNode(true) as HTMLTemplateElement;
    if (cardClone) {
      const productCard: HTMLLinkElement | null = cardClone.querySelector('.product-card');
      const cardImgLink: HTMLLinkElement | null = cardClone.querySelector('.card__img');
      if (cardImgLink !== null) {
        cardImgLink.href = `/details/${item.id}`;
        cardImgLink.style.backgroundImage = `url('${item.thumbnail}')`;
      }

      const cardTitle: HTMLElement | null = cardClone.querySelector('.card__title');
      if (cardTitle) {
        cardTitle.textContent = item.title;
      }
      const cardRating: HTMLElement | null = cardClone.querySelector('.card__rating > span');
      if (cardRating) {
        cardRating.textContent = String(item.rating);
      }
      const cardPrice: HTMLElement | null = cardClone.querySelector('.card__price');
      if (cardPrice) {
        cardPrice.innerHTML =
          '$' +
          ((item.price * (100 - item.discountPercentage)) / 100).toFixed(2) +
          `<span>$${String(item.price)}</span>`;
      }
      const cardAddit: NodeListOf<HTMLElement> | null = cardClone.querySelectorAll('.card__addit > span');
      if (cardAddit.length > 0) {
        cardAddit[0].textContent = item.category;
        cardAddit[1].textContent = item.brand;
      }
      const cardBtnDetails: HTMLLinkElement | null = cardClone.querySelector('.details');
      if (cardBtnDetails) {
        cardBtnDetails.href = `./details/${item.id}`;
      }
      const cardBtnCart: HTMLButtonElement | null = cardClone.querySelector('.cart');
      if (cardBtnCart && productCard) {
        if (BASKET_MANAGER.hasProduct(item.id)) {
          cardBtnCart.textContent = 'DROP FROM CART';
          productCard.classList.add('selected');
        }
        cardBtnCart.addEventListener('click', () => {
          if (productCard) {
            if (BASKET_MANAGER.hasProduct(item.id)) {
              BASKET_MANAGER.removeFromBasket(item.id);
              cardBtnCart.textContent = 'ADD TO CART';
              productCard.classList.remove('selected');
            } else {
              BASKET_MANAGER.addToBasket(item.id);
              cardBtnCart.textContent = 'DROP FROM CART';
              productCard.classList.add('selected');
            }
          }
        });
      }

      fragment.append(cardClone);
    }
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
      if (currentCount === 0) {
        brandItem.classList.add('empty');
      }
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
      if (currentCount === 0) {
        brandItem.classList.add('empty');
      }
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
