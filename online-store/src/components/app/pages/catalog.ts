export const catalogPageHTML = `
      <div class="wrapper">
        <aside class="aside">
        <div class="brand">
          <div class="brand__header">Brands</div>
          <div class="brand__content"></div>
        </div>
        <div class="category">
          <div class="category__header">Categories</div>
          <div class="category__content"></div>
        </div>
        <div class="range">
          <div class="range__header">Price</div>
          <div class="range__container">
            <div class="form_control">
              <div class="form_control_container">
                  <input class="form_control_container__time__input" type="number" id="priceFromInput" value="10" readonly/>
              </div>
              <div class="form_control_container">
                  <input class="form_control_container__time__input" type="number" id="priceToInput" value="1749" readonly/>
              </div>
            </div>
            <div class="sliders_control">
                <input id="min-price" type="range" value="10" step="1" min="10" max="1749"/>
                <input id="max-price" type="range" value="1749" step="1" min="10" max="1749"/>
            </div>
          </div>  
        </div>

        <div class="range">
          <div class="range__header">Stock</div>
          <div class="range__container">
            <div class="form_control">
              <div class="form_control_container">
                  <input class="form_control_container__time__input" type="number" id="stockFromInput" value="2" readonly/>
              </div>
              <div class="form_control_container">
                  <input class="form_control_container__time__input" type="number" id="stockToInput" value="150" readonly/>
              </div>
            </div>
            <div class="sliders_control">
                <input id="min-stock" type="range" value="2" step="1" min="2" max="150"/>
                <input id="max-stock" type="range" value="150" step="1" min="2" max="150"/>
            </div>
          </div>  
        </div>
          <button class="btn">click me</button>
        </aside>
  
        <div class="main">
        <div class="main__header">
            <select id="sortBox">
              <option value="" selected>Default</option>
              <option value="priceasc">Sort by price ASC</option>
              <option value="pricedesc">Sort by price DESC</option>
              <option value="ratingasc">Sort by rating ASC</option>
              <option value="ratingdesc">Sort by rating DESC</option>
            </select>
            <span id="foundCount">Found:</span>
            <input type="text" placeholder="Search" id="search" />
          </div>
          <div class="products-items"></div>
        </div>

      </div>

      <template id="card-template">
        <div class="product-card">
          <a class="card__img" href="#">
            <img src="" alt="" />
          </a>
          <div class="card__content"></div>
        </div>
      </template>`;
