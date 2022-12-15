import { STATE_MANAGER } from '../..';
import { IFilter } from '../../domain/iFilter';
import { BrandType } from '../../domain/model';

export class BrandFilter implements IFilter {
  appleBtn: HTMLInputElement | null;
  samsungBtn: HTMLInputElement | null;
  brandsArray: BrandType[];
  constructor() {
    this.appleBtn = document.querySelector('.apple');
    this.samsungBtn = document.querySelector('.samsung');
    this.brandsArray = [];
    this.loadListeners();
  }
  private loadListeners() {
    if (this.appleBtn && this.samsungBtn) {
      this.appleBtn.addEventListener('change', this.checkboxListener);
      this.samsungBtn.addEventListener('change', this.checkboxListener);
    }
  }
  private checkboxListener(e: Event): void {
    const checkInput = e.target as HTMLInputElement;
    console.log(checkInput.value);
    console.log(checkInput.checked);
    this.updateBrandsArray(checkInput.checked, checkInput.value as BrandType);
  }
  private updateBrandsArray(checked: boolean, value: BrandType) {
    if (checked) {
      this.brandsArray.push(value as BrandType);
    } else {
      const index = this.brandsArray.indexOf(value as BrandType);
      this.brandsArray.splice(index, 1);
    }
    console.log(this.brandsArray);
    this.dispatchState(this.brandsArray);
  }
  //may be private, not sure
  public dispatchState(brands: BrandType[]) {
    console.log('отправили данные в State Maanger');
    STATE_MANAGER.dispatchState({
      brand: brands,
    });
  }
  resetFilter() {
    console.log('resetted filter by brands');
  }
}
