import { IFilter } from '../../domain/iFilter';

export class CategoryFilter implements IFilter {
  dispatchState() {
    console.log('отправили данные в State Maanger');
  }
  resetFilter() {
    console.log('resetted filter by brands');
  }
}
