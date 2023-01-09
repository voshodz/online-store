import { STATE_MANAGER } from '../..';
import { CategoryArray, CategoriesType } from '../../domain/model';
import { DualSlider } from '../util/dualSlider/dualSlider';
import { createCheckboxes, renderCategoryCheckboxes } from '../views/render';

export class CategoryFilter {
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
    DualSlider.priceChange = true;
    DualSlider.stockChange = true;
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
    if (categories) {
      this.categoriesArray = categories;
    }
  }
  private updateCategoriesArray(checked: boolean, value: CategoriesType) {
    if (checked) {
      this.categoriesArray.push(value as CategoriesType);
    } else {
      const index = this.categoriesArray.indexOf(value as CategoriesType);
      this.categoriesArray.splice(index, 1);
    }
    this.dispatchState(this.categoriesArray);
  }

  public dispatchState(categories: CategoriesType[]) {
    STATE_MANAGER.dispatchState({
      category: categories,
    });
  }
}
