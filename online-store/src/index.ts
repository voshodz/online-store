/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { App } from './components/app/App';
import { BasketManager } from './components/app/BasketManager';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';
import { CategoryFilter } from './components/filter/CategoryFilter';
import { PriceFilter } from './components/filter/PriceFilter';
import { SearchFilter } from './components/filter/SearchFilter';
import { StockFilter } from './components/filter/StockFilter';
import { DualSlider } from './components/util/dualSlider';
import { urlGetState } from './components/util/parseLogic/parseUrl';
import { renderBrandCheckboxes, renderCategoryCheckboxes } from './components/views/render';

export const APP_PAGES = new App();
export const STATE_MANAGER = new StateManager();

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

window.onpopstate = () => {
  console.log('откручивание истории, не будем обрабатывать');
};
urlGetState();

const basket = new BasketManager();
