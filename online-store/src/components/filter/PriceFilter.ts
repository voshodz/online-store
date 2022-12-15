import { STATE_MANAGER } from '../..';
import { IFilter } from '../../domain/iFilter';

export class PriceFilter implements IFilter {
  minPriceInput: HTMLInputElement | null;
  maxPriceInput: HTMLInputElement | null;
  prices: [number, number];
  constructor() {
    this.minPriceInput = document.querySelector('#min-price');
    this.maxPriceInput = document.querySelector('#max-price');
    this.prices = [0, 1749];
    this.loadListeners();
  }

  private loadListeners() {
    if (this.minPriceInput && this.maxPriceInput) {
      this.minPriceInput.addEventListener('input', () => {
        this.prices[0] = Number(this.minPriceInput?.value);
        this.dispatchState(this.prices);
      });
      this.maxPriceInput.addEventListener('input', () => {
        this.prices[1] = Number(this.maxPriceInput?.value);
        this.dispatchState(this.prices);
      });
    }
  }
  dispatchState(prices: [number, number]) {
    console.log('отправили данные в State Maanger');
    STATE_MANAGER.dispatchState({
      price: prices,
    });
  }
  resetFilter() {
    console.log('resetted filter by brands');
  }
}
