enum ValidationField {
  Name,
  Phone,
  Address,
  Email,
  CreditCard,
}
export default class Modal {
  modalWindow: HTMLDivElement | null;
  modalContent: HTMLDivElement | null;
  modalName: HTMLElement | null;
  modalPhone: HTMLElement | null;
  modalAdress: HTMLElement | null;
  modalEmail: HTMLElement | null;
  modalConfirmBtn: HTMLElement | null;
  modalCardInput: HTMLElement | null;
  modalCardDueDate: HTMLElement | null;
  modalCardCVV: HTMLElement | null;
  stateName: boolean;
  statePhone: boolean;
  stateAddress: boolean;
  stateEmail: boolean;
  constructor() {
    /*this.stateName = false;
    this.statePhone = false;
    this.stateAddress = false;
    this.stateEmail = false;*/
    this.stateName = true;
    this.statePhone = true;
    this.stateAddress = true;
    this.stateEmail = true;
    this.modalWindow = document.querySelector('.modal');
    this.modalContent = document.querySelector('.modal__content');
    this.modalName = document.querySelector('.modal__name');
    this.modalPhone = document.querySelector('.modal__phone');
    this.modalAdress = document.querySelector('.modal__adress');
    this.modalEmail = document.querySelector('.modal__email');
    this.modalConfirmBtn = document.querySelector('.modal__confirm');
    this.modalCardInput = document.querySelector('.modal__cardnumber');
    this.modalCardDueDate = document.querySelector('.modal__duedate');
    this.modalCardCVV = document.querySelector('.modal__cvv');
    if (
      !this.modalWindow ||
      !this.modalContent ||
      !this.modalName ||
      !this.modalPhone ||
      !this.modalAdress ||
      !this.modalEmail ||
      !this.modalConfirmBtn ||
      !this.modalCardInput ||
      !this.modalCardDueDate ||
      !this.modalCardCVV
    ) {
      return;
    }
    this.modalWindow.addEventListener('click', () => {
      if (!this.modalWindow || !this.modalContent) {
        return;
      }
      this.modalWindow.classList.remove('active');
      this.modalContent.classList.remove('active');
      //this.modalContent.innerHTML = '';
    });
    this.modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    this.modalName.addEventListener('input', (e) => {
      const inputElement = e.target as HTMLInputElement;
      this.validateName(inputElement.value);
    });
    this.modalPhone.addEventListener('input', (e) => {
      const inputElement = e.target as HTMLInputElement;
      this.validatePhone(inputElement.value);
    });
    this.modalAdress.addEventListener('input', (e) => {
      const inputElement = e.target as HTMLInputElement;
      this.validateEmail(inputElement.value);
    });
    this.modalConfirmBtn.addEventListener('click', () => {
      this.confirmForm();
    });
    this.modalCardInput.addEventListener('input', (e) => {
      if (!this.modalCardInput) {
        return;
      }
      const inputElement = e.target as HTMLInputElement;
      const inputString = inputElement.value;
      if (inputString.length === 17) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        return;
      }
      this.validateEmail(inputElement.value);
    });
    this.modalCardDueDate.addEventListener('input', (e) => {
      if (!this.modalCardDueDate) {
        return;
      }
      const inputElement = e.target as HTMLInputElement;
      const inputString = inputElement.value;
      if (inputString.length === 2) {
        inputElement.value += '/';
      }
    });
    this.modalCardCVV.addEventListener('input', (e) => {
      if (!this.modalCardCVV) {
        return;
      }
      const inputElement = e.target as HTMLInputElement;
      const inputString = inputElement.value;
      if (inputString.length === 4) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        return;
      }
    });
  }
  private validateName(input: string) {
    if (!input) {
      this.stateName = false;
      return;
    }
    const splitName = input.split(' ');
    if (splitName.length !== 2 || !splitName[0] || !splitName[1]) {
      this.stateName = false;
      return;
    }
    if (splitName[0].length >= 3 && splitName[1].length >= 3) {
      if (splitName[0].toLowerCase().match('^[a-z]+$') && splitName[1].toLowerCase().match('^[a-z]+$')) {
        this.stateName = true;
      } else {
        this.stateName = false;
      }
    }
  }
  public validatePhone(input: string) {
    if (input[0] !== '+' || !input) {
      this.statePhone = false;
      console.log(this.statePhone);
      return;
    }
    const numbers = input.slice(1);
    if (numbers && numbers.match('^[0-9]+$') && numbers.length >= 9) {
      this.statePhone = true;
    } else {
      this.statePhone = false;
    }
    console.log(this.statePhone);
  }
  public validateAddress(input: string) {
    if (!input) {
      this.stateAddress = false;
      return;
    }
    const splitAddres = input.split(' ');
    if (splitAddres.length < 3 || !splitAddres[0] || !splitAddres[1] || !splitAddres[2]) {
      this.stateAddress = false;
      return;
    }
    if (splitAddres[0].length >= 5 && splitAddres[1].length >= 5 && splitAddres[2].length >= 5) {
      this.stateAddress = true;
    } else {
      this.stateAddress = false;
    }
  }
  public validateEmail(input: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input && re.test(input)) {
      this.stateEmail = true;
    } else {
      this.stateEmail = false;
    }
    //console.log(this.stateEmail);
  }
  private validateCardNumber(input: string) {
    console.log(input);
  }
  printstateName() {
    console.log(this.stateName);
  }
  private confirmForm() {
    console.log('confirmed!!!');
    console.log(this.stateName);
    console.log(this.statePhone);
    console.log(this.stateEmail);
    console.log(this.stateAddress);
    const container = document.querySelector('.content');
    if (this.stateName && this.statePhone && this.modalEmail && this.modalAdress) {
      setTimeout(() => {
        this.cleanLocalStorage();
        if (container) {
          container.innerHTML = '<h1>Все прошло успешно!!</h1>';
          const basketCount = document.querySelector('.basket__count') as HTMLDivElement;
          if (basketCount) {
            basketCount.innerHTML = `0`;
          }
        }
        //window.location.href = '/';
      }, 1000);
    }
  }
  private cleanLocalStorage() {
    console.log('clean storage');
    localStorage.removeItem('rs-store');
  }
  public showModal() {
    if (!this.modalWindow || !this.modalContent) {
      return;
    }
    this.modalWindow.classList.add('active');
    this.modalContent.classList.add('active');
  }
}
