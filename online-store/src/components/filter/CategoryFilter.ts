import { STATE_MANAGER } from '../..';
import { IFilter } from '../../domain/iFilter';
import { CategoriesType } from '../../domain/model';

export class CategoryFilter implements IFilter {
  categoriesArray: CategoriesType[];
  constructor() {
    this.categoriesArray = [];
  }
  // TODO loadListeners
  private updateCategoriesArray(checked: boolean, value: CategoriesType) {
    if (checked) {
      this.categoriesArray.push(value as CategoriesType);
    } else {
      const index = this.categoriesArray.indexOf(value as CategoriesType);
      this.categoriesArray.splice(index, 1);
    }
    console.log(this.categoriesArray);
    this.dispatchState(this.categoriesArray);
  }

  public dispatchState(categories: CategoriesType[]) {
    console.log('отправили данные в State Maanger');
    STATE_MANAGER.dispatchState({
      category: categories,
    });
  }
  resetFilter() {
    console.log('resetted filter by brands');
  }
}
