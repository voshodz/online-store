import { MODAL_WINDOW } from '../..';
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
    const items = localStorage.getItem('rs-store');
    if (items) {
      this.basketData = JSON.parse(items);
    }
    this.updateDataHandler();
    this.listenerPromoInput();
  }
  updateDataHandler() {
    this.updateLocalStorage();
    this.updateHeaderView();
    this.updateSummaryView();
    this.renderBasketItems();
  }
  private updateLocalStorage() {
    localStorage.setItem('rs-store', JSON.stringify(this.basketData));
  }
  public listenerPromoInput() {
    const promoRS = document.querySelector('.basket__promo-1');
    const promoTS = document.querySelector('.basket__promo-2');
    const buyBtn = document.querySelector('.basket__buybtn');
    if (promoRS && promoTS && buyBtn) {
      promoRS.addEventListener('change', () => {
        this.updateAppliedPromoView();
      });
      promoTS.addEventListener('change', () => {
        this.updateAppliedPromoView();
      });
      buyBtn.addEventListener('click', () => {
        MODAL_WINDOW.showModal();
      });
    }
    const promoInput: HTMLInputElement | null = document.querySelector('.basket__promo-input');

    if (!promoInput) {
      return;
    }
    promoInput.addEventListener('input', (e) => {
      if (promoRS && promoTS) {
        promoRS.classList.add('hidden');
        promoTS.classList.add('hidden');
      }
      const target = e.target as HTMLInputElement;
      const inputValue = target.value.toLowerCase();
      if (inputValue === 'rs' || inputValue === 'ts') {
        switch (inputValue) {
          case 'rs':
            if (promoRS) {
              promoRS.classList.remove('hidden');
              this.updateAppliedPromoView();
            }
            break;
          case 'ts':
            if (promoTS) {
              promoTS.classList.remove('hidden');
              this.updateAppliedPromoView();
            }
            console.log('tss');
            break;
          default:
            break;
        }
      }
    });
  }
  private getTotalProductsAndPrice(): [number, number] {
    let price = 0;
    let totalProducts = 0;
    this.basketData.forEach((item) => {
      price += item.count * item.price;
      totalProducts += item.count;
    });
    return [totalProducts, price];
  }
  private updateHeaderView() {
    const basketCount = document.querySelector('.basket__count') as HTMLDivElement;
    if (basketCount) {
      const products = this.getTotalProductsAndPrice()[0].toString();
      basketCount.innerHTML = products;
    }
  }
  private updateSummaryView() {
    const basketTotalPrice: HTMLElement | null = document.querySelector('.basket__total-price');
    const basketTotalProducs: HTMLElement | null = document.querySelector('.basket__total-products');
    if (basketTotalPrice && basketTotalProducs) {
      const totalData = this.getTotalProductsAndPrice();
      basketTotalProducs.innerHTML = `Products: ${totalData[0]}`;
      basketTotalPrice.innerHTML = `Total price: ${totalData[1]}$`;
    }
  }
  private getDiscount(): number {
    const rsCheckbox = document.querySelector('.basket__promo-rs') as HTMLInputElement;
    const tsCheckbox = document.querySelector('.basket__promo-ts') as HTMLInputElement;
    let discount = 1;
    if (rsCheckbox && tsCheckbox) {
      if (rsCheckbox.checked) {
        discount -= 0.1;
      }
      if (tsCheckbox.checked) {
        discount -= 0.1;
      }
    }
    return discount;
  }
  private updateAppliedPromoView() {
    const promoPrice: HTMLElement | null = document.querySelector('.basket__promo-price');
    const promoTotalPrice: HTMLElement | null = document.querySelector('.basket__total-price');
    if (!promoTotalPrice) {
      return;
    }
    if (promoPrice) {
      const discountPrice = (this.getTotalProductsAndPrice()[1] * this.getDiscount()).toFixed(0);
      promoPrice.innerHTML = `Total : ${discountPrice} $`;
    }

    const promoApplied: HTMLElement | null = document.querySelector('.basket__promo-applied');
    if (promoApplied) {
      promoApplied.innerHTML = '';
      promoTotalPrice.classList.remove('basket__old-price');
      const rsCheckbox = document.querySelector('.basket__promo-rs') as HTMLInputElement;
      const tsCheckbox = document.querySelector('.basket__promo-ts') as HTMLInputElement;
      if (rsCheckbox && rsCheckbox.checked && promoPrice) {
        promoPrice.classList.remove('hidden');
        promoTotalPrice.classList.add('basket__old-price');
        const rsDiv = document.createElement('div');
        rsDiv.classList.add('basket__promo-wrapper');
        rsDiv.innerHTML = 'RS discount 10%';
        const dropBtn = document.createElement('div');
        dropBtn.innerHTML = 'X';
        dropBtn.classList.add('basket__promo-dropbtn');
        dropBtn.addEventListener('click', () => {
          rsCheckbox.checked = false;
          promoTotalPrice.classList.remove('basket__old-price');
          promoPrice.classList.add('hidden');
          promoTotalPrice.classList.remove('basket__old-price');
          this.updateAppliedPromoView();
        });
        rsDiv.append(dropBtn);
        promoApplied.append(rsDiv);
      }
      if (tsCheckbox && tsCheckbox.checked && promoPrice) {
        promoPrice.classList.remove('hidden');
        promoTotalPrice.classList.add('basket__old-price');
        const tsDiv = document.createElement('div');
        tsDiv.classList.add('basket__promo-wrapper');
        tsDiv.innerHTML = 'TS discount 10%';
        const dropBtn = document.createElement('div');
        dropBtn.innerHTML = 'X';
        dropBtn.classList.add('basket__promo-dropbtn');
        dropBtn.addEventListener('click', () => {
          tsCheckbox.checked = false;
          promoPrice.classList.add('hidden');
          promoTotalPrice.classList.remove('basket__old-price');
          this.updateAppliedPromoView();
        });
        tsDiv.append(dropBtn);
        promoApplied.append(tsDiv);
      }
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
          this.updateAppliedPromoView();
          break;
        case Operation.Sub:
          if (this.basketData[index].count > 1) {
            this.basketData[index].count -= 1;
          } else {
            this.basketData.splice(index, index + 1);
          }
          this.updateAppliedPromoView();
          break;
      }
      this.updateDataHandler();
    });
  }
  private getProductFromId(id: number): Product {
    return sourceData.filter((product) => product.id === id)[0];
  }
  public addToBasket(id: number) {
    const product = sourceData.filter((product) => product.id === id)[0];
    this.basketData.push({ id: product.id, count: 1, price: product.price });
    this.updateLocalStorage();
  }
  public removeFromBasket(id: number) {
    this.basketData = this.basketData.filter((el) => el.id !== id);
    this.updateLocalStorage();
  }
  public hasProduct(id: number): boolean {
    if (this.basketData.filter((el) => el.id === id).length > 0) {
      return true;
    }
    return false;
  }
}
