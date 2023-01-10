import { STATE_MANAGER } from '../..';

export class PriceFilter {
  minPriceInput: HTMLInputElement | null;
  maxPriceInput: HTMLInputElement | null;
  minPriceNumber: HTMLInputElement | null;
  maxPriceNumber: HTMLInputElement | null;
  priceRange: [number, number];
  constructor() {
    this.minPriceInput = document.querySelector('#min-price');
    this.maxPriceInput = document.querySelector('#max-price');
    this.minPriceNumber = document.querySelector('#priceFromInput');
    this.maxPriceNumber = document.querySelector('#priceToInput');
    this.priceRange = [10, 1749];
    this.loadListeners();
    this.updateInputsFromState(STATE_MANAGER.getPriceState());
  }

  private updateInputsFromState(price?: [number, number]) {
    if (price) {
      if (this.minPriceInput && this.maxPriceInput && this.minPriceNumber && this.maxPriceNumber) {
        this.minPriceInput.value = String(price[0]);
        this.maxPriceInput.value = String(price[1]);
        this.minPriceNumber.value = String(price[0]);
        this.maxPriceNumber.value = String(price[1]);
      }
    }
  }

  private loadListeners() {
    if (this.minPriceInput && this.maxPriceInput) {
      this.minPriceInput.addEventListener('input', () => {
        this.priceRange[0] = Number(this.minPriceInput?.value);
        this.dispatchState(this.priceRange);
      });
      this.maxPriceInput.addEventListener('input', () => {
        this.priceRange[1] = Number(this.maxPriceInput?.value);
        this.dispatchState(this.priceRange);
      });
    }
  }
  dispatchState(prices: [number, number]) {
    STATE_MANAGER.dispatchState({
      price: prices,
    });
  }
}
