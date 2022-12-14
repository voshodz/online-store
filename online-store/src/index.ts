/* eslint-disable @typescript-eslint/no-var-requires */

import '../src/styles/index.scss';
import { StateManager } from './components/app/StateManager';

const img = require('./assets//img/girl.png');
//import myImportedImg from './assets/img/anime.png';
//console.log(myImportedImg); //ошибка выходит

const body = document.querySelector('body');
if (body) {
  const myImg = document.createElement('img');
  myImg.src = img;
  body.appendChild(myImg);
}
console.log(img);

const STATE_MANAGER = new StateManager();
STATE_MANAGER.printFilterState();
