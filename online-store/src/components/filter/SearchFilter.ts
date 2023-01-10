import { STATE_MANAGER } from '../..';
import { DualSlider } from '../util/dualSlider/dualSlider';

export class SearchFilter {
  searchInput: HTMLInputElement | null;
  search?: string;
  constructor() {
    this.searchInput = document.querySelector('#search');
    this.search = '';
    this.loadListeners();
    this.updateSearchFromState(STATE_MANAGER.getSearchState());
  }

  private loadListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        DualSlider.priceChange = true;
        DualSlider.stockChange = true;
        this.search = this.searchInput?.value;
        this.dispatchState(this.search);
      });
    }
  }

  private updateSearchFromState(search?: string) {
    if (this.searchInput) {
      if (search) {
        this.search = search;
        this.searchInput.value = search;
      } else {
        this.search = '';
        this.searchInput.value = '';
      }
    }
  }

  dispatchState(search?: string) {
    STATE_MANAGER.dispatchState({
      search: search,
    });
  }
}
