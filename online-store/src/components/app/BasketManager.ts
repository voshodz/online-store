interface BasketProducts {
  id: number;
  count: number;
  price: number;
}
export class BasketManager {
  private basketData: BasketProducts[];
  private basketTestBtn: HTMLElement | null;
  constructor() {
    this.basketData = [];
    this.basketData.push({ id: 1, count: 20, price: 500 });
    localStorage.setItem('rs-store', JSON.stringify(this.basketData));
    this.basketTestBtn = document.querySelector('.basket__testbtn');
    if (this.basketTestBtn) {
      this.basketTestBtn.addEventListener('click', () => {
        console.log('clicked');
        this.basketData.push({ id: 1, count: 20, price: 500 });
        this.updateDataHandler();
      });
    }
  }
  updateDataHandler() {
    localStorage.setItem('rs-store', JSON.stringify(this.basketData));
    this.updateHeaderView();
    this.renderBasketItems();
  }
  updateHeaderView() {
    const basketCount = document.querySelector('.basket__count') as HTMLDivElement;
    if (basketCount) {
      basketCount.innerHTML = this.basketData.length.toString();
    }
  }
  renderBasketItems() {
    const itemsWrapper: HTMLElement | null = document.querySelector('.basket__items');
    if (!itemsWrapper) {
      return;
    }
    itemsWrapper.innerHTML = '';

    this.basketData.forEach((product) => {
      const basketProduct = document.createElement('div');
      basketProduct.className = `basket__product`;
      basketProduct.innerHTML = product.id.toString();
      itemsWrapper.appendChild(basketProduct);
    });
  }
}
