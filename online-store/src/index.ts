/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { StateManager } from './components/app/StateManager';
import { BrandFilter } from './components/filter/BrandFilter';

// const img = require('./assets//img/girl.png');
import img from './assets/img/anime.png';
console.log(img); //ошибка выходит

const body = document.querySelector('body');
if (body) {
  const myImg = document.createElement('img');
  myImg.src = img;
  body.appendChild(myImg);
}
//console.log(img);

export const STATE_MANAGER = new StateManager();
const brandHandler = new BrandFilter();
STATE_MANAGER.printFilterState();
STATE_MANAGER.dispatchState({ maxPrice: 25 });
STATE_MANAGER.printFilterState();
brandHandler.dispatchState();
console.log('После добавления брэндов в состояние');
STATE_MANAGER.printFilterState();
//https://prnt.sc/AUHTMqBgR9DV глянь картинку
