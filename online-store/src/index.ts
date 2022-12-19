/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { App } from './components/app/App';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';
import { CategoryFilter } from './components/filter/CategoryFilter';
import { PriceFilter } from './components/filter/PriceFilter';
import { SearchFilter } from './components/filter/SearchFilter';
import { StockFilter } from './components/filter/StockFilter';
import { urlGetState } from './components/util/parseLogic/parseUrl';

export const APP_PAGES = new App();
export const STATE_MANAGER = new StateManager();

const brandHandler = new BrandFilter();
const categoryHandler = new CategoryFilter();
const priceFilter = new PriceFilter();
const stockFilter = new StockFilter();
const searchFilter = new SearchFilter();

window.onpopstate = () => {
  console.log('откручивание истории, не будем обрабатывать');
};
urlGetState();
