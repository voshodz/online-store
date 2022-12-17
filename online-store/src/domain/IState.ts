import { BrandType, Product } from './model';

export enum SortType {
  default = '',
  priceASC = 'priceasc',
  priceDESC = 'pricedesc',
  ratingASC = 'ratingasc',
  ratingDESC = 'ratingdesc',
}

export enum Page {
  Main,
  Basket,
  Details,
}

export interface FilterState {
  filteredArray?: Product[];
  category?: string[]; //Todo надо типизировать
  brand?: BrandType[];
  price?: [number, number];
  stock?: [number, number];
  sort?: SortType; //воскликацетельный знак везде потому что фильтры будут отправлять только часть поля
  search?: string;
  big?: boolean;
  page?: Page;
}

export type dispatchType = FilterState;
