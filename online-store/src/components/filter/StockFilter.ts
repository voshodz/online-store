import { STATE_MANAGER } from '../..';
import { IFilter } from '../../domain/iFilter';

export class StockFilter implements IFilter {
  minStockInput: HTMLInputElement | null;
  maxStockInput: HTMLInputElement | null;
  stock: [number, number];
  constructor() {
    this.minStockInput = document.querySelector('#min-stock');
    this.maxStockInput = document.querySelector('#max-stock');
    this.stock = [2, 150];
    this.loadListeners();
  }

  private loadListeners() {
    if (this.minStockInput && this.maxStockInput) {
      this.minStockInput.addEventListener('input', () => {
        this.stock[0] = Number(this.minStockInput?.value);
        this.dispatchState(this.stock);
      });
      this.maxStockInput.addEventListener('input', () => {
        this.stock[1] = Number(this.maxStockInput?.value);
        this.dispatchState(this.stock);
      });
    }
  }
  dispatchState(stocks: [number, number]) {
    console.log('отправили данные в State Maanger');
    STATE_MANAGER.dispatchState({
      stock: stocks,
    });
  }
  resetFilter() {
    console.log('resetted filter by brands');
  }
}
