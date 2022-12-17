import { STATE_MANAGER } from '../../..';
import { FilterState } from '../../../domain/IState';

export const renderStockSection = (state: FilterState) => {
  const stockSection = document.querySelector('.filter__stock') as HTMLDivElement;
  if (state.stock) {
    stockSection.innerHTML = `<input type="range" value="${state.stock[0]}" min="2" max="150" id="min-stock">
                              <input type="range" value="${state.stock[1]}" min="2" max="150" id="max-stock"><br>`;
  } else {
    stockSection.innerHTML = `<input type="range" value="2" min="2" max="150" id="min-stock">
                              <input type="range" value="150" min="2" max="150" id="max-stock"><br>`;
  }
  console.log('rendering Stock section');
};
