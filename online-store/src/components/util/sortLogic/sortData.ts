import { STATE_MANAGER } from '../../..';
import { FilterState, SortType } from '../../../domain/IState';
import { Product } from '../../../domain/model';

export function updateSortBoxFromState(state: FilterState): void {
  const sortState: SortType | undefined = state.sort;
  const optionsElem: NodeListOf<HTMLOptionElement> | null = document.querySelectorAll('#sortBox > option');
  if (sortState && optionsElem && optionsElem.length > 0) {
    optionsElem.forEach((el) => {
      if (el.value === sortState.toString()) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });
  }
}

export function initSortBox(): void {
  const sortBox: HTMLSelectElement | null = document.querySelector('#sortBox');
  if (sortBox) {
    sortBox.addEventListener('change', () => {
      let options: FilterState = { sort: SortType.default };
      switch (sortBox.selectedOptions[0].value) {
        case SortType.priceASC: {
          options = { sort: SortType.priceASC };
          break;
        }
        case SortType.priceDESC: {
          options = { sort: SortType.priceDESC };
          break;
        }
        case SortType.ratingASC: {
          options = { sort: SortType.ratingASC };
          break;
        }
        case SortType.ratingDESC: {
          options = { sort: SortType.ratingDESC };
          break;
        }
      }
      STATE_MANAGER.dispatchState(options);
    });
  }
}

export function sortData(products: Product[]): Product[] {
  const sortBox: HTMLSelectElement | null = document.querySelector('#sortBox');
  if (sortBox) {
    switch (sortBox.selectedOptions[0].value) {
      case SortType.priceASC: {
        products.sort((a, b) => a.price - b.price);
        break;
      }
      case SortType.priceDESC: {
        products.sort((a, b) => b.price - a.price);
        break;
      }
      case SortType.ratingASC: {
        products.sort((a, b) => a.rating - b.rating);
        break;
      }
      case SortType.ratingDESC: {
        products.sort((a, b) => b.rating - a.rating);
        break;
      }
    }
  }
  return products;
}
