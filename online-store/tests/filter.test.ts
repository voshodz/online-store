/* eslint-disable no-undef */

import { sourceData } from '../src/domain/source';
import { filterByBrand } from '../src/components/util/filterLogic/filterBrand';
import { filterByCategory } from '../src/components/util/filterLogic/filterCategory';
import { filterByPrice } from '../src/components/util/filterLogic/filterPrice';
import { filterByStock } from '../src/components/util/filterLogic/filterStock';
import { filterBySearch } from '../src/components/util/filterLogic/filterSearch';

describe('filter test', () => {
  test('test filter By brand', () => {
    const brands = ['Apple', 'Samsung'];
    expect(filterByBrand(brands, sourceData)).toHaveLength(5);
  });
  test('test filter By category', () => {
    const categories = ['smartphones', 'laptops'];
    expect(filterByCategory(categories, sourceData)).toHaveLength(10);
  });
  test('test filter By price', () => {
    const price: [number, number] = [1609, 1749];
    expect(filterByPrice(price, sourceData)).toHaveLength(1);
  });
  test('test filter By Stock', () => {
    const stock: [number, number] = [2, 10];
    expect(filterByStock(stock, sourceData)).toHaveLength(6);
  });
  test('test filter By Search', () => {
    const search = 'mag';
    expect(filterBySearch(search, sourceData)).toHaveLength(2);
  });
});
