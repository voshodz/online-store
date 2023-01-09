import { Product } from '../../../domain/model';

export const filterBySearch = (search: string, data: Product[]): Product[] => {
  const filterByTitle = data.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
  const filterBybrand = data.filter((product) => product.brand.toLowerCase().includes(search.toLowerCase()));
  const filterByCategory = data.filter((product) => product.category.toLowerCase().includes(search.toLowerCase()));
  const filterByPrice = data.filter((product) => product.price.toString().toLowerCase().includes(search.toLowerCase()));
  const filterByDiscountPrice = data.filter((product) =>
    ((product.price * (100 - product.discountPercentage)) / 100)
      .toFixed(2)
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const filterByRating = data.filter((product) =>
    product.rating.toString().toLowerCase().includes(search.toLowerCase())
  );
  const filteredSet: Set<Product> = new Set();
  filterByTitle.forEach((el) => filteredSet.add(el));
  filterBybrand.forEach((el) => filteredSet.add(el));
  filterByCategory.forEach((el) => filteredSet.add(el));
  filterByPrice.forEach((el) => filteredSet.add(el));
  filterByDiscountPrice.forEach((el) => filteredSet.add(el));
  filterByRating.forEach((el) => filteredSet.add(el));
  const filteredArray = new Array(...filteredSet);
  return filteredArray;
};
