import { dispatchType, FilterState, Page, SortType } from '../../domain/IState';
import { sourceData } from '../../domain/source';
import { filterAllData } from '../util/filterLogic/filterData';
import { urlGetState, urlUpdateFromState } from '../util/parseLogic/parseUrl';
import { renderBasket } from '../views/basket';
import { renderProducts } from '../views/render';

export class StateManager {
  private state: FilterState;
  constructor() {
    this.state = {
      filteredArray: [],
      brand: [],
      category: [],
      price: [1, 2000],
      stock: [1, 150],
      sort: SortType.default,
      search: '',
      big: false,
      page: Page.Main,
    };
    //renderProducts(sourceData); // basic render
    this.loadStateFromUrl();
  }
  public loadStateFromUrl() {
    const resultFromUrl = urlGetState(); // static method, no need create object of class
    if (resultFromUrl === 'root') {
      this.setState({
        filteredArray: [],
        brand: [],
        price: [1, 2000],
        stock: [1, 150],
        sort: SortType.default,
        search: '',
        big: false,
        page: Page.Main,
      });
      return;
    }
    if (resultFromUrl === 'basket') {
      console.log('basket');
      this.setState({
        page: Page.Basket,
      });
      return;
    }
    if (typeof resultFromUrl === 'object') {
      this.dispatchState(resultFromUrl);
    }
  }

  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
    this.stateChangedEventHandler();
  }
  private stateChangedEventHandler() {
    const filteredData = filterAllData(this.state);
    switch (this.state.page) {
      case Page.Main:
        renderProducts(filteredData);
        break;
      case Page.Basket:
        renderBasket();
        break;
      default:
        break;
    }
    //urlUpdateFromState(this.state);
    //тут еще вызовем функция обновления фильтров от состояния
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
