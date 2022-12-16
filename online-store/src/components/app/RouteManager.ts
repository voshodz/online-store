import { FilterState } from '../../domain/IState';
import { BrandType } from '../../domain/model';
import { parseBrand } from '../util/parseLogic/parseUrl';

export class RouteManager {
  static getStateFromUrl(): FilterState | string {
    console.log('=> ' + window.location.href);
    //return;
    const baseUrl = window.location.origin;
    let queryString = window.location.href.slice(baseUrl.length);
    if (queryString === '/') {
      return 'root';
    }
    queryString = queryString.replace('/', ''); //удаляем черточку
    if (queryString[0] === '?') {
      queryString = queryString.replace('?', '');
    }
    //console.log(queryString);
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
    const resultState: FilterState = {
      brand: brands,
    };
    return resultState;
  }
  printRouter() {
    console.log('asdfb');
  }
}
