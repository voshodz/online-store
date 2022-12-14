import { BrandType, Product } from './model';

export interface FilterState {
  filteredArray?: Product[];
  brandType?: BrandType[];
  maxPrice?: number;
  minPrice?: number;
}

export type dispatchType = FilterState;
