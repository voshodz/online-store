/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { RouteManager } from './components/app/RouteManager';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';
import { PriceFilter } from './components/filter/PriceFilter';
import { StockFilter } from './components/filter/StockFilter';

import { renderProducts } from './components/views/render';
import { sourceData } from './domain/source';

export const STATE_MANAGER = new StateManager();
export const ROUTE_MANAGER = new RouteManager();

const brandHandler = new BrandFilter();
const priceFilter = new PriceFilter();
const stockFilter = new StockFilter();

window.onpopstate = () => {
  console.log('onpopstate' + window.location.href);
  //STATE_MANAGER.loadStateFromUrl();
  STATE_MANAGER.loadStateFromUrl();
};
