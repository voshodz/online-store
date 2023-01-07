import { basketPageHTML } from './pages/basket';
import { catalogPageHTML } from './pages/catalog';

export class App {
  contentContainer: HTMLDivElement | null;
  constructor() {
    this.contentContainer = document.querySelector('.root');
  }

  public renderMain() {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = '';
    this.contentContainer.innerHTML = catalogPageHTML;
  }

  public renderBasket() {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = basketPageHTML;
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