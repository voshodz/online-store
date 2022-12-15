import { dispatchType, FilterState, SortType } from '../../domain/IState';
import { sourceData } from '../../domain/source';
import { filterAllData } from '../util/filterLogic/filterData';
import { renderProducts } from '../views/render';

export class StateManager {
  private state: FilterState;
  constructor() {
    this.state = {
      filteredArray: [],
      brand: [],
      price: [1, 100],
      sort: SortType.default,
      search: '',
      big: false,
    };
  }

  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
    this.stateChangeddhandler();
  }
  private stateChangeddhandler() {
    const filteredData = filterAllData(this.state);
    renderProducts(filteredData);
  }
  public dispatchState(dispatchedState: dispatchType) {
    this.setState(dispatchedState);
    //так как вызвалось изменение состояние, надо вызвать функцию фильтрации, filterLogic папка
    //чистая функция котоаря принимает FilterState, и выдаёт данные в зависимости от массива
    //далее отфильтрованные отдаются Views, там уже дом манипуляции
  }
  public getStoreState() {
    return this.state;
  }
  public getBasketState() {
    return 'basket state';
  }
  printFilterState() {
    console.log(this.state);
  }
}
