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
    this.contentContainer.innerHTML = `<div class="basket__wrapper">
                                          <div class="basket__products">
                                            <div class="basket__header">
                                              Products in Cart
                                            </div>
                                            <div class="basket__items">
                                              <div class="basket__product">
                                                1
                                              </div>
       
                                            </div>
                                          </div>
                                          <div class="basket__summary"
                                            
                                          >
                                            <div class="basket__summary-title"">Summary</div>
                                            <div class="basket__total-products">Products: 1</div>
                                            <div class="basket__total-price basket__old-price">Total: 500$</div>
                                            <div class="basket__promo-price ">Total: 500$</div>
                                            <div class="basket__promo-applied">
                                            </div>
                                            <input type="text" class="basket__promo-input" autocomplete="off"></input>
                                            <div class="basket__promo-wrapper">
                                              <div class="basket__promo-1">
                                                <label for="RS">RS promo 10 %</label>
                                                <input type="checkbox" class="basket__promo-rs" name="RS"></input>
                                              </div>
                                              <div class="basket__promo-2">
                                                <label for="TS">TS promo 10 %</label>
                                                <input type="checkbox" class="basket__promo-ts" name="TS"></input>
                                              </div>
                                              
                                              
                                            </div>
                                            
                                            
                                            <h4>"RS", "TS" - promocodes</h4>
                                          </div>
                                      </div>`;
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
