export const basketPageHTML = `<div class="basket__wrapper">
<div class="modal">
  <div class="modal__content">
    <div class="modal__result">
    <h4 style="color: black">Person details</h4>
      <div style="position: relative;">
        <input type="text" class="modal__name" placeholder="Name"></input>
        <span class="error error__name hidden">error</span>
      </div>
      <div style="position: relative;">
        <input type="text" class="modal__phone" placeholder="Phone number"></input>
        <span class="error error__phone hidden">error</span>
      </div>
      <div style="position: relative;">
        <input type="text" class="modal__adress" placeholder="Address"></input>
        <span class="error error__adress hidden">error</span>
      </div>
      <div style="position: relative;">
        <input type="text" class="modal__email" placeholder="E-mail"></input>
        <span class="error error__email hidden">error</span>
      </div>
      <h4 style="color: black">Card details</h4>
      <div class="modal__card">
          <div class="modal__cardwrapper">
            <div class="modal__paysystem">Visa</div>
            <div style="position: relative;">
              <input type="text" class="modal__cardnumber"></input>
              <span class="error error__cardnumber hidden">error</span>
            </div>
          </div>
          <div class="modal__cardwrapper2">
            <span>VALID</span>
            <div style="position: relative;">
              <input type="text" class="modal__duedate"></input>
              <span class="error error__duedate hidden">error</span>
            </div>
            <span>CVV</span>
            <div style="position: relative;">
              <input type="text" class="modal__cvv"></input>
              <span class="error error__cvv hidden">error</span>
            </div>
            
          </div>
      </div>
      <div class="modal__confirm">Confirm</div>
    </div>
  </div>
</div>
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
