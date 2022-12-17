import { STATE_MANAGER } from '../..';
import { IFilter } from '../../domain/iFilter';

export class SearchFilter implements IFilter {
  searchInput: HTMLInputElement | null;
  search?: string;
  constructor() {
    this.searchInput = document.querySelector('#search');
    this.search = '';
    this.loadListeners();
  }

  private loadListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        this.search = this.searchInput?.value;
        this.dispatchState(this.search);
      });
    }
  }
  dispatchState(search?: string) {
    console.log('отправили данные в State Maanger');
    STATE_MANAGER.dispatchState({
      search: search,
    });
  }
  resetFilter() {
    console.log('resetted filter by brands');
  }
}
