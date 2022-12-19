export class App {
  contentContainer: HTMLDivElement | null;
  constructor() {
    this.contentContainer = document.querySelector('.content');
  }

  public renderMain() {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = '';
    this.contentContainer.innerHTML = `
                                      <div class="brand"></div>
                                      <div class="category"></div>
                                      <input type="range" value="0" min="0" max="1749" id="min-price" />
                                      <input type="range" value="1749" min="0" max="1749" id="max-price" /><br />
                                      <input type="range" value="2" min="2" max="150" id="min-stock" />
                                      <input type="range" value="150" min="2" max="150" id="max-stock" /><br />
                                      <input type="text" placeholder="Search" id="search" />
                                      <button class="btn">click me</button>
                                      <div class="products-items"></div>

                                      <template id="card-template">
                                        <div class="product-card">
                                          <div class="card__img">
                                            <img src="" alt="" />
                                          </div>
                                          <div class="card__content"></div>
                                        </div>
                                      </template>`;
  }

  public renderBasket() {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = '<h1>Тут будет корзина</h1>';
  }

  public renderProductDetails(/**id of product */ id: string) {
    console.log('product details');
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = '';
    this.contentContainer.innerHTML = `<h1>страница для карточки ${id}</h1>`;
  }
}
