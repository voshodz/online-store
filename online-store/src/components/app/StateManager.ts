import { APP_PAGES } from '../..';
import { dispatchType, FilterState, PageEnum, SortType } from '../../domain/IState';
import { sourceData } from '../../domain/source';
import { filterAllData } from '../util/filterLogic/filterData';
import { urlGetState, urlUpdateFromState } from '../util/parseLogic/parseUrl';
import { renderProducts } from '../views/render';

export class StateManager {
  private state: FilterState;
  constructor() {
    this.state = {
      filteredArray: [],
      brand: [],
      category: [],
      price: [10, 1749],
      stock: [1, 150],
      sort: SortType.default,
      search: '',
      big: false,
      page: PageEnum.MainPage,
    };
    renderProducts(sourceData); // basic render
    this.loadStateFromUrl();
  }
  public loadStateFromUrl() {
    const resultFromUrl = urlGetState(); // static method, no need create object of class
    if (resultFromUrl === 'root') {
      APP_PAGES.renderMain();
      renderProducts(sourceData);
      return;
    }
    if (resultFromUrl === 'basket') {
      this.setState({
        page: PageEnum.BasketPage,
      });
      APP_PAGES.renderBasket();
      return;
    }
    if (resultFromUrl === 'details') {
      this.setState({
        page: PageEnum.ProductDetailPage,
      });
      const query = window.location.href.slice(window.location.origin.length + 1);
      APP_PAGES.renderProductDetails(query);
      return;
    }
    if (typeof resultFromUrl === 'object') {
      this.state = { ...this.state, ...resultFromUrl };
      const filteredData = filterAllData(this.state);
      renderProducts(filteredData);
    }
  }

  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
    this.stateChangedEventHandler();
    //this.printFilterState();
  }
  private stateChangedEventHandler() {
    const filteredData = filterAllData(this.state);
    renderProducts(filteredData);
    urlUpdateFromState(this.state);
    //тут еще вызовем функция обновления фильтров от состояния
  }
  public dispatchState(dispatchedState: dispatchType) {
    this.setState(dispatchedState);
    //так как вызвалось изменение состояние, надо вызвать функцию фильтрации, filterLogic папка
    //чистая функция котоаря принимает FilterState, и выдаёт данные в зависимости от массива
    //далее отфильтрованные отдаются Views, там уже дом манипуляции
  }
  public getBrandState() {
    return this.state.brand;
  }
  public getCategoryState() {
    return this.state.brand;
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
