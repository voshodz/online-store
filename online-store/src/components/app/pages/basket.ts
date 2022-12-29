export const basketPageHTML = `<div class="basket__wrapper">
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
<div class="basket__summary">
  <div class="basket__summary-title"">Summary</div>
  <div class="basket__total-products">Products: 1</div>
  <div class="basket__total-price">Total: 500$</div>
  <div class="basket__promo-price hidden">Total: 500$</div>
  <div class="basket__promo-applied">
  </div>
  <input type="text" class="basket__promo-input" autocomplete="off"></input>
  <div class="basket__promo-wrapper">
    <div class="basket__promo-1 hidden">
      <label for="RS">RS promo 10 %</label>
      <input type="checkbox" class="basket__promo-rs" name="RS"></input>
    </div>
    <div class="basket__promo-2 hidden">
      <label for="TS">TS promo 10 %</label>
      <input type="checkbox" class="basket__promo-ts" name="TS"></input>
    </div>
    
    
  </div>
  <h4>"RS", "TS" - promocodes</h4>
  <div class="basket__buybtn">BUY NOW</div>
</div>
</div>`;
