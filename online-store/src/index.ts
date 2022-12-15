/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';
import { PriceFilter } from './components/filter/PriceFilter';
import { StockFilter } from './components/filter/StockFilter';

import { renderProducts } from './components/views/render';
import { sourceData } from './domain/source';

export const STATE_MANAGER = new StateManager();
const brandHandler = new BrandFilter();


/*
эксперименты с URL, можешь глянуть, если непонятно спроси
const btn = document.querySelector('.btn') as HTMLButtonElement;
btn.addEventListener('click', () => {
  renderProducts(sourceData);
});*/

/*const categoriesArray: string[] = ['apple', 'xiaomi', 'samsung'];
const getQueryParametres = () => {
  let result = '?brand=';
  categoriesArray.forEach((item) => {
    result += `${item}+`;
  });
  return '#' + result.slice(0, -1);
};
console.log(window.location.href);
let query = '#';

const btn = document.querySelector('.btn') as HTMLButtonElement;
btn.addEventListener('click', () => {
  query += '+';
  window.history.pushState({}, '', getQueryParametres());
  console.log('changed:  ' + window.location.href);
});

window.onpopstate = () => {
  console.log(window.location.href);
};*/
