import { Product } from '../../../domain/model';

export class DualSlider {
  priceChange: boolean;
  stockChange: boolean;
  constructor() {
    this.priceChange = true;
    this.stockChange = true;
    this.addListeners();
    this.setPriceValue();
  }

  addListeners() {
    const fromSliderPrice: HTMLInputElement | null = document.querySelector('#min-price');
    const toSliderPrice: HTMLInputElement | null = document.querySelector('#max-price');
    const fromInputPrice: HTMLInputElement | null = document.querySelector('#priceFromInput');
    const toInputPrice: HTMLInputElement | null = document.querySelector('#priceToInput');
    if (fromSliderPrice && toSliderPrice && fromInputPrice && toInputPrice) {
      this.fillSlider(fromSliderPrice, toSliderPrice, '#C6C6C6', '#25daa5', toSliderPrice);
      this.setToggleAccessible(toSliderPrice);

      fromSliderPrice.oninput = () => {
        this.controlFromSlider(fromSliderPrice, toSliderPrice, fromInputPrice);
        this.priceChange = false;
      };
      toSliderPrice.oninput = () => {
        this.controlToSlider(fromSliderPrice, toSliderPrice, toInputPrice);
        this.priceChange = false;
      };
      fromInputPrice.oninput = () => {
        this.controlFromInput(fromSliderPrice, fromInputPrice, toInputPrice, toSliderPrice);
        this.priceChange = false;
      };
      toInputPrice.oninput = () => {
        this.controlToInput(toSliderPrice, fromInputPrice, toInputPrice, toSliderPrice);
        this.priceChange = false;
      };
    }

    const fromSliderStock: HTMLInputElement | null = document.querySelector('#min-stock');
    const toSliderStock: HTMLInputElement | null = document.querySelector('#max-stock');
    const fromInputStock: HTMLInputElement | null = document.querySelector('#stockFromInput');
    const toInputStock: HTMLInputElement | null = document.querySelector('#stockToInput');
    if (fromSliderStock && toSliderStock && fromInputStock && toInputStock) {
      this.fillSlider(fromSliderStock, toSliderStock, '#C6C6C6', '#25daa5', toSliderStock);
      this.setToggleAccessible(toSliderStock);

      fromSliderStock.oninput = () => {
        this.controlFromSlider(fromSliderStock, toSliderStock, fromInputStock);
        this.stockChange = false;
      };
      toSliderStock.oninput = () => {
        this.controlToSlider(fromSliderStock, toSliderStock, toInputStock);
        this.stockChange = false;
      };
      fromInputStock.oninput = () => {
        this.controlFromInput(fromSliderStock, fromInputStock, toInputStock, toSliderStock);
        this.stockChange = false;
      };
      toInputStock.oninput = () => {
        this.controlToInput(toSliderStock, fromInputStock, toInputStock, toSliderStock);
        this.stockChange = false;
      };
    }
  }

  setPriceValue(filteredData?: Product[]) {
    const fromSliderPrice: HTMLInputElement | null = document.querySelector('#min-price');
    const toSliderPrice: HTMLInputElement | null = document.querySelector('#max-price');
    const fromInputPrice: HTMLInputElement | null = document.querySelector('#priceFromInput');
    const toInputPrice: HTMLInputElement | null = document.querySelector('#priceToInput');
    if (fromSliderPrice && toSliderPrice && fromInputPrice && toInputPrice && filteredData && filteredData.length > 0) {
      let min = filteredData[0].price;
      let max = filteredData[0].price;
      filteredData.forEach((prod) => {
        if (min > prod.price) min = prod.price;
        if (max < prod.price) max = prod.price;
      });
      if (this.priceChange) {
        fromSliderPrice.value = String(min);
        fromInputPrice.value = String(min);
        toSliderPrice.value = String(max);
        toInputPrice.value = String(max);
      }
      this.priceChange = true;
      this.controlToSlider(fromSliderPrice, toSliderPrice, toInputPrice);
      this.controlFromSlider(fromSliderPrice, toSliderPrice, fromInputPrice);
    }
  }

  setStockValue(filteredData?: Product[]) {
    const fromSliderStock: HTMLInputElement | null = document.querySelector('#min-stock');
    const toSliderStock: HTMLInputElement | null = document.querySelector('#max-stock');
    const fromInputStock: HTMLInputElement | null = document.querySelector('#stockFromInput');
    const toInputStock: HTMLInputElement | null = document.querySelector('#stockToInput');
    if (fromSliderStock && toSliderStock && fromInputStock && toInputStock && filteredData && filteredData.length > 0) {
      let min = filteredData[0].stock;
      let max = filteredData[0].stock;
      filteredData.forEach((prod) => {
        if (min > prod.stock) min = prod.stock;
        if (max < prod.stock) max = prod.stock;
      });
      if (this.stockChange) {
        fromSliderStock.value = String(min);
        toSliderStock.value = String(max);
        fromInputStock.value = String(min);
        toInputStock.value = String(max);
      }
      this.stockChange = true;
      this.controlFromSlider(fromSliderStock, toSliderStock, fromInputStock);
      this.controlToSlider(fromSliderStock, toSliderStock, toInputStock);
    }
  }

  controlFromInput(
    fromSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement
  ) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
      fromSlider.value = String(to);
      fromInput.value = String(to);
    } else {
      fromSlider.value = String(from);
    }
  }

  controlToInput(
    toSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement
  ) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    this.setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = String(to);
      toInput.value = String(to);
    } else {
      toInput.value = String(from);
    }
  }

  controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = String(to);
      fromInput.value = String(to);
    } else {
      fromInput.value = String(from);
    }
  }

  controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = String(to);
      toInput.value = String(to);
    } else {
      toInput.value = String(from);
      toSlider.value = String(from);
    }
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement
  ) {
    const rangeDistance = Number(to.max) - Number(to.min);
    const fromPosition: number = Number(from.value) - Number(to.min);
    const toPosition = Number(to.value) - Number(to.min);
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  setToggleAccessible(currentTarget: HTMLInputElement) {
    const toSlider: HTMLElement | null = document.querySelector('#toSlider');
    if (toSlider) {
      if (Number(currentTarget.value) <= 0) {
        toSlider.style.zIndex = String(2);
      } else {
        toSlider.style.zIndex = String(0);
      }
    }
  }
}
