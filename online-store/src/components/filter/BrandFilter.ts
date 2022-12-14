import { STATE_MANAGER } from '../..';
import { IFilter } from '../../domain/iFilter';

export class BrandFilter implements IFilter {
  dispatchState() {
    console.log('отправили данные в State Maanger');
    STATE_MANAGER.dispatchState({ brandType: ['Huawei', 'Apple'] });
  }
  resetFilter() {
    console.log('resetted filter by brands');
  }
}
