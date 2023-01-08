import { BASKET_MANAGER } from '../../..';
import { Product } from '../../../domain/model';

export const DetailsPage = `
<div class="details">
<div class="bread-crumbs">
  <a class="bread-crumbs__item" href="/">STORE</a>
  <div class="bread-crumbs__separator">/</div>
  <a class="bread-crumbs__item">CATEGORY</a>
  <div class="bread-crumbs__separator">/</div>
  <a class="bread-crumbs__item">BRAND</a>
  <div class="bread-crumbs__separator">/</div>
  <a class="bread-crumbs__item">NAME</a>
</div>

<div class="product">
  <div class="product__title">
    <div class="product__name">Name</div>
    <div class="product__rating">⭐<span>4.9</span></div>
  </div>
  <div class="product__content">
    <div class="product__images">
      <div class="product__images-list">
        <template id="product__images-item">
          <div class="product__images-item">
            <img src="" alt="">
          </div>
        </template>
      </div>
      <div class="product__current-image">
        <img src="" alt="">
      </div>
    </div>
    <div class="product__details">
        
        <div class="product__description"></div>
        <div class="product__category">Category: Category</div>
        <div class="product__brand">Brand: Brand</div>
        <div class="product__stock">Stock: Number</div>
        
      </div>
      <div class="product__column">
        <div class="product__price">$15.35<span>$17.39</span></div>
        <button class="btn cart">ADD TO CART</button>
        <button class="btn buy">Buy Now</button>
      </div>
  </div>
</div>
</div>
`;

export function updateProductInfo(product: Product) {
  const breadCrumbs: NodeListOf<HTMLLinkElement> | null = document.querySelectorAll('.bread-crumbs__item');
  if (breadCrumbs.length > 0) {
    breadCrumbs[0].textContent = 'STORE';
    breadCrumbs[1].textContent = product.category;
    breadCrumbs[1].href = `./?category=${product.category.replace(/\s/g, '').toLowerCase()}`;
    breadCrumbs[2].textContent = product.brand;
    breadCrumbs[2].href = `./?brand=${product.brand.replace(/\s/g, '').toLowerCase()}`;
    breadCrumbs[3].textContent = product.title;
    breadCrumbs[3].href = `./?search=${product.title}`;
  }
  const productName: HTMLDivElement | null = document.querySelector('.product__name');
  if (productName) {
    productName.textContent = product.title;
  }
  const productRating: HTMLSpanElement | null = document.querySelector('.product__rating > span');
  if (productRating) {
    productRating.textContent = String(product.rating);
  }
  const currentImg: HTMLImageElement | null = document.querySelector('.product__current-image > img');
  if (currentImg) {
    currentImg.src = product.images[0];
    currentImg.alt = product.title;
  }
  const imageTemplate: HTMLTemplateElement | null = document.querySelector('#product__images-item');
  const fragment: DocumentFragment = document.createDocumentFragment();
  if (imageTemplate) {
    product.images.forEach((el, id) => {
      const imageClone: HTMLTemplateElement | null = imageTemplate.content.cloneNode(true) as HTMLTemplateElement;
      const img: HTMLImageElement | null = imageClone.querySelector('img');
      if (img) {
        img.src = el;
        img.alt = product.title;
      }
      const item: HTMLDivElement | null = imageClone.querySelector('.product__images-item');
      if (item) {
        item.addEventListener('click', () => {
          if (currentImg) {
            currentImg.src = el;
          }
        });
      }
      fragment.appendChild(imageClone);
    });
  }
  const imageList: HTMLDivElement | null = document.querySelector('.product__images-list');
  if (imageList) {
    imageList.append(fragment);
  }
  const productDescription: HTMLDivElement | null = document.querySelector('.product__description');
  if (productDescription) {
    productDescription.innerHTML = '<b>Description:</b> ' + product.description;
  }
  const productCategory: HTMLDivElement | null = document.querySelector('.product__category');
  if (productCategory) {
    productCategory.innerHTML = '<b>Category:</b> ' + product.category;
  }
  const productBrand: HTMLDivElement | null = document.querySelector('.product__brand');
  if (productBrand) {
    productBrand.innerHTML = '<b>Brand:</b> ' + product.brand;
  }
  const productStock: HTMLDivElement | null = document.querySelector('.product__stock');
  if (productStock) {
    productStock.innerHTML = '<b>Stock:</b> ' + product.stock;
  }
  const productPrice: HTMLDivElement | null = document.querySelector('.product__price');
  if (productPrice) {
    const discountPrice: number = (product.price * (100 - product.discountPercentage)) / 100;
    productPrice.innerHTML = `$${discountPrice.toFixed(2)} <span>$${product.price}</span>`;
  }
  const cartBtn: HTMLButtonElement | null = document.querySelector('.cart');
  if (cartBtn) {
    if (BASKET_MANAGER.hasProduct(product.id)) {
      cartBtn.textContent = 'Drop from cart';
    }
    cartBtn.addEventListener('click', () => {
      if (BASKET_MANAGER.hasProduct(product.id)) {
        BASKET_MANAGER.removeFromBasket(product.id);
        cartBtn.textContent = 'ADD TO CART';
      } else {
        BASKET_MANAGER.addToBasket(product.id);
        cartBtn.textContent = 'DROP FROM CART';
      }
    });
  }
  const buyBtn: HTMLButtonElement | null = document.querySelector('.buy');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      if (!BASKET_MANAGER.hasProduct(product.id)) {
        BASKET_MANAGER.addToBasket(product.id);
      }
      localStorage.setItem('modal', 'on');
      window.location.assign('/?basket');
    });
  }
}
