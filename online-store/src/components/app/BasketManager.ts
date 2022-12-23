import { Product } from '../../domain/model';
import { sourceData } from '../../domain/source';

interface BasketProducts {
  id: number;
  count: number;
  price: number;
}
enum Operation {
  Add,
  Sub,
}
export class BasketManager {
  private basketData: BasketProducts[];
  constructor() {
    this.basketData = [];
    this.initLocalstorage();
    const items = localStorage.getItem('rs-store');
    if (items) {
      this.basketData = JSON.parse(items);
    }
    this.updateHeaderView();
    this.renderBasketItems();
  }
  initLocalstorage() {
    this.basketData.push({
      id: 1,
      count: 1,
      price: 549,
    });
    this.basketData.push({ id: 2, count: 1, price: 899 });
    this.basketData.push({ id: 75, count: 1, price: 68 });
    localStorage.setItem('rs-store', JSON.stringify(this.basketData));
  }
  updateDataHandler() {
    this.updateLocalStorage();
    this.updateHeaderView();
    this.renderBasketItems();
  }
  updateLocalStorage() {
    localStorage.setItem('rs-store', JSON.stringify(this.basketData));
  }
  updateHeaderView() {
    const basketCount = document.querySelector('.basket__count') as HTMLDivElement;
    let total = 0;
    if (basketCount) {
      this.basketData.forEach((item) => {
        total += item.count;
      });
      basketCount.innerHTML = total.toString();
    }
  }
  private renderBasketItems() {
    const itemsWrapper: HTMLElement | null = document.querySelector('.basket__items');
    if (!itemsWrapper) {
      return;
    }
    itemsWrapper.innerHTML = '';

    this.basketData.forEach((item) => {
      const basketProduct = document.createElement('div');
      basketProduct.className = `basket__product`;
      const currentProduct = this.getProductFromId(item.id);

      const basketImg = document.createElement('div');
      basketImg.innerHTML = `<img src="${currentProduct.images[0]}">`;
      basketImg.className = 'basket__img';
      const productTitle = document.createElement('div');
      productTitle.className = 'basket__title';
      productTitle.innerHTML = currentProduct.title + ' ' + 'stock: ' + currentProduct.stock;

      const addBtn = document.createElement('div');
      addBtn.className = 'basket__btn';
      addBtn.innerHTML = '+';
      const subBtn = document.createElement('div');
      subBtn.className = 'basket__btn';
      subBtn.innerHTML = '-';
      const totalOfPRoduct = document.createElement('span');
      totalOfPRoduct.innerHTML = item.count.toString();
      const controlWrapper = document.createElement('div');
      controlWrapper.className = 'basket__control-wrapper';

      const controlBtns = document.createElement('div');
      controlBtns.className = 'basket__control';
      controlBtns.append(addBtn);
      controlBtns.append(totalOfPRoduct);
      controlBtns.append(subBtn);
      const controlTotalStock = document.createElement('span');
      controlTotalStock.innerHTML = 'stock: ' + currentProduct.stock.toString();
      const controlTotalPrice = document.createElement('span');
      controlTotalPrice.innerHTML = `сумма: ${item.count * currentProduct.price}$`;
      controlWrapper.append(controlTotalStock);
      controlWrapper.append(controlBtns);
      controlWrapper.append(controlTotalPrice);

      this.listenerToControlBtn(addBtn, item.id, Operation.Add, currentProduct.stock);
      this.listenerToControlBtn(subBtn, item.id, Operation.Sub, currentProduct.stock);
      basketProduct.append(basketImg);
      basketProduct.append(productTitle);
      basketProduct.append(controlWrapper);

      itemsWrapper.appendChild(basketProduct);
    });
  }
  private listenerToControlBtn(btn: HTMLElement, id: number, operation: Operation, totalStock: number) {
    btn.addEventListener('click', () => {
      let index = 0;
      this.basketData.forEach((data, ind) => {
        if (data.id === id) {
          index = ind;
        }
      });
      switch (operation) {
        case Operation.Add:
          if (this.basketData[index].count < totalStock) {
            this.basketData[index].count += 1;
          }
          break;
        case Operation.Sub:
          if (this.basketData[index].count > 1) {
            this.basketData[index].count -= 1;
          } else {
            this.basketData.splice(index, index + 1);
          }
          break;
        default:
          break;
      }
      this.updateDataHandler();
    });
  }
  private getProductFromId(id: number): Product {
    return sourceData.filter((product) => product.id === id)[0];
  }
}
