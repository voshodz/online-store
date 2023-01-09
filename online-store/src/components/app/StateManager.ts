import { APP_PAGES, BASKET_MANAGER } from '../..';
import { dispatchType, FilterState, PageEnum, SortType } from '../../domain/IState';
import { sourceData } from '../../domain/source';
import { DualSlider } from '../util/dualSlider/dualSlider';
import { filterAllData, filterBrandCategory } from '../util/filterLogic/filterData';
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
    const resultFromUrl = urlGetState();
    switch (resultFromUrl) {
      case 'root':
        APP_PAGES.renderMain();
        renderProducts(sourceData);
        break;
      case 'basket':
        APP_PAGES.renderBasket();
        BASKET_MANAGER.updateDataHandler();
        BASKET_MANAGER.listenerPromoInput();
        break;
      case 'details':
        this.setState({
          page: PageEnum.ProductDetailPage,
        });
        APP_PAGES.renderProductDetails(this.getDetailsUrl());
        window.history.pushState({}, '', `/details/${this.getDetailsUrl()}`);
        break;
      case '404':
        this.setState({
          page: PageEnum.NotFound,
        });
        APP_PAGES.renderPage404();
        break;
      default:
        break;
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
  private getDetailsUrl() {
    const query = window.location.pathname;
    const temp = query.split('/');
    const id = temp.pop();
    return id;
  }
  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
    this.stateChangedEventHandler();
  }
  private stateChangedEventHandler() {
    DualSlider.setPriceValue(filterBrandCategory(this.state));
    DualSlider.setStockValue(filterBrandCategory(this.state));
    this.state = { ...this.state, ...DualSlider.getStateFromSliders() };
    const filteredData = filterAllData(this.state);
    this.state.filteredArray = filteredData;
    const sortedData = sortData(filteredData);
    renderProducts(sortedData);
    this.events.forEach((callback: callback) => callback());
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
}
