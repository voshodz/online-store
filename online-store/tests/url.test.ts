import { getQueryParamBrand } from '../src/components/util/parseLogic/queryByBrand';
import { getQueryParamCategory } from '../src/components/util/parseLogic/queryByCategory';
import { getQueryParamBig } from '../src/components/util/parseLogic/queryByBIg';
import { getQueryParamStock } from '../src/components/util/parseLogic/queryByStock';
import { getQueryParamPrice } from '../src/components/util/parseLogic/queryByPrice';
import { BrandType, CategoriesType } from '../src/domain/model';
describe('url tests', () => {
  test('test query By Brand', () => {
    const brand: BrandType[] = ['Apple'];
    expect(getQueryParamBrand(brand)).toBe('&brand=apple');
  });
  test('test query By Category', () => {
    const categories: CategoriesType[] = ['smartphones', 'laptops'];
    expect(getQueryParamCategory(categories)).toBe('&category=smartphones+laptops');
  });
  test('test query By Big', () => {
    expect(getQueryParamBig(true)).toBe('&big=true');
  });
  test('test query By price', () => {
    const price: [number, number] = [10, 300];
    expect(getQueryParamPrice(price)).toBe('&price=10+300');
  });
  test('test query By price', () => {
    const stock: [number, number] = [10, 300];
    expect(getQueryParamStock(stock)).toBe('&stock=10+300');
  });
});
//getQueryParamBrand
//getQueryParamCategory
//getQueryParamBig
