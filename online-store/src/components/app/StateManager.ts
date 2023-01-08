import { APP_PAGES, BASKET_MANAGER, MODAL_WINDOW } from '../..';
import { dispatchType, FilterState, PageEnum, SortType } from '../../domain/IState';
import { sourceData } from '../../domain/source';
import { DualSlider } from '../util/dualSlider/dualSlider';
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
      const temp = query.split('/');
      APP_PAGES.renderProductDetails(temp.pop());
      return;
    }
    if (resultFromUrl === '404') {
      this.setState({
        page: PageEnum.NotFound,
      });
      APP_PAGES.renderPage404();
      return;
    }
    if (typeof resultFromUrl === 'object') {
      APP_PAGES.renderMain();
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
  }
  private stateChangedEventHandler() {
    const filteredData = filterAllData(this.state);
    this.state.filteredArray = filteredData;
    const sortedData = sortData(filteredData);
    renderProducts(sortedData);
    this.events.forEach((callback: callback) => callback());
    this.state = { ...this.state, ...DualSlider.getStateFromSliders() };
    urlUpdateFromState(this.state);
  }
  public dispatchState(dispatchedState: dispatchType) {
    this.setState(dispatchedState);
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
  public getBigModeState() {
    return this.state.big;
  }
  public getSearchState() {
    return this.state.search;
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
