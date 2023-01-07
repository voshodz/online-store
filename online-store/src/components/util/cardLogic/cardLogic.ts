import { STATE_MANAGER } from '../../..';

export function initTypeBtns() {
  const listBtn: HTMLButtonElement | null = document.querySelector('.card-type__btn-list');
  const blocksBtn: HTMLButtonElement | null = document.querySelector('.card-type__btn-blocks');
  listBtn?.addEventListener('click', () => cardTypeBtnAction(listBtn, true));
  blocksBtn?.addEventListener('click', () => cardTypeBtnAction(blocksBtn, false));
  initBtnsFromState();
}

function initBtnsFromState() {
  const listBtn: HTMLButtonElement | null = document.querySelector('.card-type__btn-list');
  const blocksBtn: HTMLButtonElement | null = document.querySelector('.card-type__btn-blocks');
  const productContainer: HTMLDivElement | null = document.querySelector('.products-items');
  if (listBtn && blocksBtn && productContainer) {
    if (STATE_MANAGER.getBigModeState()) {
      listBtn.classList.add('active');
      blocksBtn.classList.remove('active');
      productContainer.classList.add('product-items--list');
    } else {
      blocksBtn.classList.add('active');
      listBtn.classList.remove('active');
    }
  }
}

function cardTypeBtnAction(target: HTMLButtonElement, value: boolean) {
  const listBtn: HTMLButtonElement | null = document.querySelector('.card-type__btn-list');
  const blocksBtn: HTMLButtonElement | null = document.querySelector('.card-type__btn-blocks');
  const productContainer: HTMLDivElement | null = document.querySelector('.products-items');
  if (listBtn && blocksBtn) {
    listBtn.classList.remove('active');
    blocksBtn.classList.remove('active');
  }
  target.classList.add('active');
  STATE_MANAGER.dispatchState({ big: value });
  if (productContainer) {
    if (value) {
      productContainer.classList.add('product-items--list');
    } else {
      productContainer.classList.remove('product-items--list');
    }
  }
}
