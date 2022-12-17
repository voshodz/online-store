/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { RouteManager } from './components/app/RouteManager';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';
import { PriceFilter } from './components/filter/PriceFilter';
import { SearchFilter } from './components/filter/SearchFilter';
import { StockFilter } from './components/filter/StockFilter';

//window.history.pushState({}, '', '/');
export const STATE_MANAGER = new StateManager();
export const ROUTE_MANAGER = new RouteManager();

const brandHandler = new BrandFilter();
const priceFilter = new PriceFilter();
const stockFilter = new StockFilter();
const searchFilter = new SearchFilter();

window.onpopstate = () => {
  console.log('откручивание истории, не будем обрабатывать');
};
