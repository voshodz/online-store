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
  private limit: number;
  private page: number;
  constructor() {
    this.basketData = [];
    [this.limit, this.page] = this.getPageAndLimitFromUrl();
    const items = localStorage.getItem('rs-store');
    if (items) {
      this.basketData = JSON.parse(items);
    }
    this.updateDataHandler();
    this.listenerPromoInput();
  }
  updateDataHandler() {
    this.listenerInputLimit();
    this.updateLocalStorage();
    this.updateHeaderView();
    this.updateSummaryView();
    this.renderBasketItems();
  }
  private updateLocalStorage() {
    if (this.basketData.length === 0) {
      localStorage.removeItem('rs-store');
      return;
    }
    if (this.basketData.length > 0) {
      localStorage.setItem('rs-store', JSON.stringify(this.basketData));
    }
  }
  private listenerInputLimit() {
    console.log('started');
    const limitInput: HTMLInputElement | null = document.querySelector('.basket__limit');
    if (!limitInput) return;
    console.log('alert is working');
    limitInput.value = this.limit.toString();
    //this.limit = parseInt(limitInput.value);
    limitInput.addEventListener('input', (e) => {
      const currentInput = e.target as HTMLInputElement;
      const limitValue = parseInt(currentInput.value);
      if (limitValue < 1) {
        limitInput.value = '1';
      }
      if (limitValue > this.basketData.length) {
        limitInput.value = `${this.basketData.length}`;
      }
      this.limit = parseInt(limitInput.value);
      this.renderBasketItems();
      this.changeUrl();
    });
    const prevPage: HTMLInputElement | null = document.querySelector('.basket__prevpage');
    const nextPage: HTMLInputElement | null = document.querySelector('.basket__nextpage');
    const pageField: HTMLInputElement | null = document.querySelector('.basket__page');
    if (!prevPage || !nextPage || !pageField) return;
    pageField.innerHTML = '';
    pageField.innerHTML = this.page.toString();
    prevPage.addEventListener('click', () => {
      if (this.page > 1) {
        pageField.innerHTML = '';
        this.page -= 1;
        pageField.innerHTML += this.page;
        this.renderBasketItems();
        this.changeUrl();
      }
    });
    nextPage.addEventListener('click', () => {
      const totalPages = this.getTotalPages(this.basketData.length, this.limit);
      if (this.page < totalPages) {
        pageField.innerHTML = '';
        this.page += 1;
        pageField.innerHTML += this.page;
        this.renderBasketItems();
        this.changeUrl();
      }
    });
  }
  private getPageAndLimitFromUrl(): [number, number] {
    const paramsString = window.location.href.slice(window.location.origin.length + 1);
    const query = paramsString.split('+')[1];
    let resultLimit = 3;
    let resultPage = 1;
    if (!query) {
      return [resultLimit, resultPage];
    }
    const params = new URLSearchParams(query);
    const arr: Array<string[]> = [];
    for (const p of params) {
      arr.push(p);
    }
    arr.forEach((item) => {
      switch (item[0]) {
        case 'limit':
          resultLimit = parseInt(item[1]);
          break;
        case 'page':
          resultPage = parseInt(item[1]);
          break;
        default:
          break;
      }
    });
    return [resultLimit, resultPage];
  }
  private changeUrl() {
    window.history.replaceState({}, '', `/?basket+limit=${this.limit}&page=${this.page}`);
  }
  private getTotalPages(totalItems: number, limit: number): number {
    let result = Math.floor(totalItems / limit);
    if (totalItems % limit > 0) {
      result += 1;
    }
    return result;
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
    const basketSum = document.querySelector('.basket__count > span') as HTMLSpanElement;
    const basketCount = document.querySelector('.header__cart > span') as HTMLSpanElement;
    if (basketCount && basketSum) {
      const [count, sum] = this.getTotalProductsAndPrice();
      basketCount.textContent = String(count);
      basketSum.textContent = sum.toFixed(2);
    }
  }
  private updateSummaryView() {
    const basketTotalPrice: HTMLElement | null = document.querySelector('.basket__total-price');
    const basketTotalProducs: HTMLElement | null = document.querySelector('.basket__total-products');
    if (basketTotalPrice && basketTotalProducs) {
      const totalData = this.getTotalProductsAndPrice();
      basketTotalProducs.innerHTML = `Products: ${totalData[0]}`;
      basketTotalPrice.innerHTML = `Total price: ${totalData[1].toFixed(2)}$`;
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
    if (this.basketData.length === 0) {
      const basketWrapper = document.querySelector('.basket__wrapper');
      if (!basketWrapper) return;
      basketWrapper.innerHTML = `<div style="margin-top: 100px;font-size: 48px;">Корзина пуста</div>`;
      return;
    }

    const dataCurrentPage = this.getPaginatedData(this.basketData);
    if (dataCurrentPage.length === 0) {
      if (this.page > 1) {
        this.page -= 1;
      }
      this.updatePageField();
      this.drawData(this.getPaginatedData(this.basketData));
      return;
    }
    this.drawData(dataCurrentPage);
  }
  private drawData(data: BasketProducts[]) {
    const itemsWrapper: HTMLElement | null = document.querySelector('.basket__items');
    if (!itemsWrapper) {
      return;
    }
    itemsWrapper.innerHTML = '';
    data.forEach((item) => {
      const basketProduct = document.createElement('div');
      //basketProduct.href = `${window.location.origin}/?details/${item.id}`;
      basketProduct.className = `basket__product`;
      const currentProduct = this.getProductFromId(item.id);

      const basketOrderItem = document.createElement('div');
      basketOrderItem.innerHTML = `${this.getOrderIndexFromId(item.id) + 1}`;

      const basketImg = document.createElement('a');
      basketImg.href = `${window.location.origin}/?details/${item.id}`;
      basketImg.innerHTML = `<img src="${currentProduct.images[0]}">`;
      basketImg.className = 'basket__img';
      const productTitle = document.createElement('div');
      productTitle.className = 'basket__title';
      const productName = document.createElement('span');
      productName.className = 'basket__name';
      productName.innerHTML = currentProduct.title + `<hr>`;
      const productDescription = document.createElement('span');
      productDescription.className = 'basket__desc';
      productDescription.innerHTML = currentProduct.description.slice(0, 25) + `...`;

      const productRating = document.createElement('span');
      productRating.className = 'basket__rate';
      productRating.innerHTML = `Rating: ${currentProduct.rating}     Discount: ${currentProduct.discountPercentage}`;

      productTitle.append(productName);
      productTitle.append(productDescription);
      productTitle.append(productRating);
      //productTitle.innerHTML = currentProduct.title + ' ' + 'stock: ' + currentProduct.stock;

      const addBtn = document.createElement('div');
      addBtn.className = 'basket__btn';
      addBtn.innerHTML = '+';
      const subBtn = document.createElement('div');
      subBtn.className = 'basket__btn';
      subBtn.innerHTML = '-';
      const totalOfPRoduct = document.createElement('span');
      totalOfPRoduct.innerHTML = item.count.toString();
      totalOfPRoduct.className = 'basket__totalcount';
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
      basketProduct.append(basketOrderItem);
      basketProduct.append(basketImg);
      basketProduct.append(productTitle);
      basketProduct.append(controlWrapper);

      itemsWrapper.appendChild(basketProduct);
    });
  }
  private getPaginatedData(items: BasketProducts[]): BasketProducts[] {
    const limit = this.limit;
    const page = this.page;
    const offset = limit * (page - 1);
    const result = items.slice(offset, limit + offset);
    return result;
  }
  private updatePageField() {
    const pageField = document.querySelector('.basket__page');
    if (!pageField) return;
    pageField.innerHTML = ``;
    pageField.innerHTML = this.page.toString();
  }
  private listenerToControlBtn(btn: HTMLElement, id: number, operation: Operation, totalStock: number) {
    btn.addEventListener('click', (e: Event) => {
      e.stopPropagation();
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
            this.basketData.splice(index, 1);
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
  private getOrderIndexFromId(id: number): number {
    let result = 0;
    this.basketData.forEach((item, index) => {
      if (item.id === id) result = index;
    });
    return result;
  }
  public addToBasket(id: number) {
    const product = sourceData.filter((product) => product.id === id)[0];
    const productPrice = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(2);
    this.basketData.push({ id: product.id, count: 1, price: parseFloat(productPrice) });
    this.updateLocalStorage();
    this.updateHeaderView();
  }
  public removeFromBasket(id: number) {
    this.basketData = this.basketData.filter((el) => el.id !== id);
    this.updateLocalStorage();
    this.updateHeaderView();
  }
  public hasProduct(id: number): boolean {
    if (this.basketData.filter((el) => el.id === id).length > 0) {
      return true;
    }
    return false;
  }
}
