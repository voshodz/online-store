import { ROUTE_MANAGER } from '../..';
import { dispatchType, FilterState, SortType } from '../../domain/IState';
import { BrandType } from '../../domain/model';
import { sourceData } from '../../domain/source';
import { filterAllData } from '../util/filterLogic/filterData';
import { parseBrand, updateUrlFromState } from '../util/parseLogic/parseUrl';
import { renderProducts } from '../views/render';
import { RouteManager } from './RouteManager';

export class StateManager {
  private state: FilterState;
  constructor() {
    this.state = {
      filteredArray: [],
      brand: [],
      price: [1, 2000],
      stock: [1, 150],
      sort: SortType.default,
      search: '',
      big: false,
    };
    renderProducts(sourceData); // basic render
    //this.parseNewWindowUrl();
    this.loadStateFromUrl();
  }
  public loadStateFromUrl() {
    const resultFromUrl = RouteManager.getStateFromUrl();
    if (typeof resultFromUrl === 'string') {
      this.stateChangeddhandler();
      return;
    }
    console.log(resultFromUrl);
    if (typeof resultFromUrl === 'object') {
      this.dispatchState(resultFromUrl);
    }
    //console.log(resultFromUrl);
  }
  private parseNewWindowUrl() {
    console.log(window.location.href);
    //return;
    const baseUrl = window.location.origin;
    let queryString = window.location.href.slice(baseUrl.length);
    if (queryString === '/') {
      return;
    }
    queryString = queryString.replace('/', ''); //удаляем черточку
    if (queryString[0] === '?') {
      queryString = queryString.replace('?', '');
    }
    console.log(queryString);
    let queryBrands: string[] = [];
    const queryParametres = queryString.split('&');
    queryParametres.forEach((st) => {
      if (st[0] == 'b') {
        queryBrands = parseBrand(st);
      }
    });
    const brands: BrandType[] = [];
    queryBrands.forEach((brandString) => {
      const brandValue = (brandString[0].toUpperCase() + brandString.slice(1, brandString.length)) as BrandType;
      brands.push(brandValue);
    });
    this.setState({ brand: brands });
    //this.printFilterState();
  }

  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
    this.stateChangeddhandler();
  }
  private stateChangeddhandler() {
    const filteredData = filterAllData(this.state);
    renderProducts(filteredData);
    updateUrlFromState(this.state);
    //тут еще вызовем функция обновления фильтров от состояния
    //this.printFilterState();
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
