/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { App } from './components/app/App';
import { BasketManager } from './components/app/BasketManager';
import Modal from './components/app/Modal';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';
import { CategoryFilter } from './components/filter/CategoryFilter';
import { PriceFilter } from './components/filter/PriceFilter';
import { SearchFilter } from './components/filter/SearchFilter';
import { StockFilter } from './components/filter/StockFilter';
import { initTypeBtns } from './components/util/cardLogic/cardLogic';
import { DualSlider } from './components/util/dualSlider/dualSlider';
import { urlGetState } from './components/util/parseLogic/parseUrl';
import { initSortBox, updateSortBoxFromState } from './components/util/sortLogic/sortData';
import { renderBrandCheckboxes, renderCategoryCheckboxes } from './components/views/render';
import { sourceData } from './domain/source';

export const APP_PAGES = new App();
export const BASKET_MANAGER = new BasketManager();
export const STATE_MANAGER = new StateManager();

export const MODAL_WINDOW = new Modal();

if (localStorage.getItem('modal') === 'on') {
  console.log(MODAL_WINDOW);
  MODAL_WINDOW.showModal();
  localStorage.setItem('modal', 'off');
}

initSortBox();
initTypeBtns();

const brandHandler = new BrandFilter();
const categoryHandler = new CategoryFilter();
const priceFilter = new PriceFilter();
const stockFilter = new StockFilter();
const searchFilter = new SearchFilter();
const sliders = new DualSlider();

STATE_MANAGER.addCallback(() => {
  renderBrandCheckboxes(brandHandler.checkboxArray, STATE_MANAGER.getFilterState());
});
STATE_MANAGER.addCallback(() => {
  renderCategoryCheckboxes(categoryHandler.checkboxArray, STATE_MANAGER.getFilterState());
});
STATE_MANAGER.addCallback(() => {
  sliders.setPriceValue(STATE_MANAGER.getFilterState());
  sliders.setStockValue(STATE_MANAGER.getFilterState());
});

const resetBtn = document.querySelector('#reset-filter');
const copyBtn = document.querySelector('#copy-link');
const filterBtn = document.querySelector('#filter-btn');
const closeBtn = document.querySelector('#close');

if (resetBtn && copyBtn && filterBtn && closeBtn) {
  resetBtn.addEventListener('click', () => {
    STATE_MANAGER.dispatchState({
      filteredArray: sourceData,
      search: '',
      brand: [],
      category: [],
      price: [10, 1749],
      stock: [2, 150],
    });
    location.reload();
    console.log(location);
  });
  copyBtn.addEventListener('click', () => {
    copyBtn.textContent = 'Copied';
    navigator.clipboard.writeText(window.location.toString());
    setTimeout(() => {
      copyBtn.textContent = 'Copy Link';
    }, 500);
  });
  const toggleFunc = () => {
    const aside = document.querySelector('.aside');
    aside?.classList.toggle('open');
  };
  filterBtn.addEventListener('click', toggleFunc);
  closeBtn.addEventListener('click', toggleFunc);
}

window.onpopstate = () => {
  console.log('откручивание истории, не будем обрабатывать');
};
urlGetState();
