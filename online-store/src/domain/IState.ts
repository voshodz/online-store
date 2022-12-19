import { BrandType, CategoriesType, Product } from './model';

export enum SortType {
  default = '',
  priceASC = 'priceasc',
  priceDESC = 'pricedesc',
  ratingASC = 'ratingasc',
  ratingDESC = 'ratingdesc',
}
export enum PageEnum {
  MainPage = 'main',
  BasketPage = 'basket',
  ProductDetailPage = 'details',
}
export interface FilterState {
  filteredArray?: Product[];
  category?: CategoriesType[];
  brand?: BrandType[];
  price?: [number, number];
  stock?: [number, number];
  sort?: SortType; //воскликацетельный знак везде потому что фильтры будут отправлять только часть поля
  search?: string;
  big?: boolean;
  page?: PageEnum;
}

export type dispatchType = FilterState;
