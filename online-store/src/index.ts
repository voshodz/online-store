/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';
import { PriceFilter } from './components/filter/PriceFilter';
import { StockFilter } from './components/filter/StockFilter';
import { urlGetState } from './components/util/parseLogic/parseUrl';

//window.history.pushState({}, '', '/');
export const STATE_MANAGER = new StateManager();

const brandHandler = new BrandFilter();
const priceFilter = new PriceFilter();
const stockFilter = new StockFilter();

window.onpopstate = () => {
  console.log('откручивание истории, не будем обрабатывать');
};
urlGetState();
