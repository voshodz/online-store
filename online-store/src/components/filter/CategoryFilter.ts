import { STATE_MANAGER } from '../..';
import { IFilter } from '../../domain/iFilter';
import { CategoryArray, CategoriesType } from '../../domain/model';
import { createCheckboxes, renderCategoryCheckboxes } from '../views/render';

export class CategoryFilter implements IFilter {
  checkboxArray: HTMLInputElement[];
  categoriesArray: CategoriesType[];
  constructor() {
    this.checkboxArray = createCheckboxes(CategoryArray);
    this.categoriesArray = [];
    renderCategoryCheckboxes(this.checkboxArray, STATE_MANAGER.getFilterState());
    this.loadListeners();
    this.updateCheckboxFromState(STATE_MANAGER.getCategoryState());
  }
  private loadListeners() {
    this.checkboxArray.forEach((elem) => {
      elem.addEventListener('change', this.checkboxListener.bind(this));
    });
  }
  private checkboxListener(e: Event): void {
    const checkInput = e.target as HTMLInputElement;
    this.updateCategoriesArray(checkInput.checked, checkInput.value as CategoriesType);
  }
  private updateCheckboxFromState(categories?: CategoriesType[]): void {
    categories?.forEach((category) => {
      const checkbox: HTMLInputElement = this.checkboxArray.filter(
        (el) => el.value.toLowerCase() === category.toLowerCase()
      )[0];
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }
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
