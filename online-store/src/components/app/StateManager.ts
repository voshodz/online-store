import { dispatchType, FilterState, SortType } from '../../domain/IState';
import { BrandType } from '../../domain/model';
import { filterAllData } from '../util/filterLogic/filterData';
import { parseBrand, updateUrlFromState } from '../util/parseLogic/parseUrl';
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
    this.parseNewWindowUrl();
  }
  private parseNewWindowUrl() {
    const baseUrl = window.location.origin;
    let queryString = window.location.href.slice(baseUrl.length);
    if (queryString === '/') {
      return;
    }
    queryString = queryString.replace('/#', ''); //удаляем решетку
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
  }

  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
    this.stateChangeddhandler();
  }
  private stateChangeddhandler() {
    const filteredData = filterAllData(this.state);
    renderProducts(filteredData);
    updateUrlFromState(this.state);
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
