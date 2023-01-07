import { APP_PAGES, BASKET_MANAGER } from '../..';
import { dispatchType, FilterState, PageEnum, SortType } from '../../domain/IState';
import { sourceData } from '../../domain/source';
import { filterAllData } from '../util/filterLogic/filterData';
import { urlGetState, urlUpdateFromState } from '../util/parseLogic/parseUrl';
import { sortData, updateSortBoxFromState } from '../util/sortLogic/sortData';
import { renderProducts } from '../views/render';

type callback = () => void;

export class StateManager {
  private state: FilterState;
  private events: callback[];
  constructor() {
    this.state = {
      filteredArray: sourceData,
      brand: [],
      category: [],
      price: [10, 1749],
      stock: [1, 150],
      sort: SortType.default,
      search: '',
      big: false,
      page: PageEnum.MainPage,
    };
    this.events = [];
    this.loadStateFromUrl();
  }

  public addCallback(callback: callback): void {
    this.events.push(callback);
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
      BASKET_MANAGER.updateDataHandler();
      BASKET_MANAGER.listenerPromoInput();
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
      updateSortBoxFromState(this.state);
      const filteredData = filterAllData(this.state);
      const sortedData = sortData(filteredData);
      renderProducts(sortedData);
    }
  }

  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
    this.stateChangedEventHandler();
    //this.printFilterState();
  }
  private stateChangedEventHandler() {
    const filteredData = filterAllData(this.state);
    this.state.filteredArray = filteredData;
    const sortedData = sortData(filteredData);
    renderProducts(sortedData);
    urlUpdateFromState(this.state);
    this.events.forEach((callback: callback) => callback());
    //тут еще вызовем функция обновления фильтров от состояния
  }
  public dispatchState(dispatchedState: dispatchType) {
    this.setState(dispatchedState);
    //так как вызвалось изменение состояние, надо вызвать функцию фильтрации, filterLogic папка
    //чистая функция котоаря принимает FilterState, и выдаёт данные в зависимости от массива
    //далее отфильтрованные отдаются Views, там уже дом манипуляции
  }
  public getFilterState() {
    return this.state.filteredArray;
  }
  public getBrandState() {
    return this.state.brand;
  }
  public getCategoryState() {
    return this.state.category;
  }
  public getPriceState() {
    return this.state.price;
  }
  public getStockState() {
    return this.state.stock;
  }
  public getSortState() {
    return this.state.sort;
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
