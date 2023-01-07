import { Product } from '../../domain/model';
import { sourceData } from '../../domain/source';
import { basketPageHTML } from './pages/basket';
import { catalogPageHTML } from './pages/catalog';
import { DetailsPage, updateProductInfo } from './pages/details';

export class App {
  contentContainer: HTMLDivElement | null;
  constructor() {
    this.contentContainer = document.querySelector('.root');
  }

  public renderMain() {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = catalogPageHTML;
  }

  public renderBasket() {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = basketPageHTML;
  }

  public renderProductDetails(id?: string) {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = '';
    console.log(id);
    const product: Product | undefined = sourceData.find((el) => el.id === Number(id));
    if (product) {
      this.contentContainer.innerHTML = DetailsPage;
      updateProductInfo(product);
    } else {
      this.renderPage404();
    }
  }

  public renderPage404() {
    if (!this.contentContainer) {
      return;
    }
    this.contentContainer.innerHTML = '404';
  }
}
