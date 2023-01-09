import { STATE_MANAGER } from '../..';
import { BrandArray, BrandType } from '../../domain/model';
import { DualSlider } from '../util/dualSlider/dualSlider';
import { createCheckboxes, renderBrandCheckboxes } from '../views/render';

export class BrandFilter {
  checkboxArray: HTMLInputElement[];
  brandsArray: BrandType[];
  constructor() {
    this.checkboxArray = createCheckboxes(BrandArray);
    this.brandsArray = [];
    renderBrandCheckboxes(this.checkboxArray, STATE_MANAGER.getFilterState());
    this.loadListeners();
    this.updateCheckboxFromState(STATE_MANAGER.getBrandState());
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
    this.updateBrandsArray(checkInput.checked, checkInput.value as BrandType);
  }
  private updateCheckboxFromState(brands?: BrandType[]): void {
    brands?.forEach((brand) => {
      const checkbox: HTMLInputElement = this.checkboxArray.filter(
        (el) => el.value.toLowerCase() === brand.toLowerCase()
      )[0];
      if (checkbox) {
        checkbox.checked = true;
      }
    });
    if (brands) {
      this.brandsArray = brands;
    }
  }
  private updateBrandsArray(checked: boolean, value: BrandType) {
    if (checked) {
      this.brandsArray.push(value as BrandType);
    } else {
      const index = this.brandsArray.indexOf(value as BrandType);
      this.brandsArray.splice(index, 1);
    }
    this.dispatchState(this.brandsArray);
  }
  public dispatchState(brands: BrandType[]) {
    STATE_MANAGER.dispatchState({
      brand: brands,
    });
  }
}
