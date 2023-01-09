import visaIcon from '../../assets/img/iconpayment/visa.png';
import masterCardIcon from '../../assets/img/iconpayment/master.png';
import mirIcon from '../../assets/img/iconpayment/mir2.png';
const MAX_LENGTH_PHONE = 12;
const MIN_LENGTH_PHONE = 9;
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
  isNameValid: boolean;
  isPhoneValid: boolean;
  isAddressValid: boolean;
  isEmailValid: boolean;
  isCardNumberValid: boolean;
  isExpirationDateValid: boolean;
  isCvvValid: boolean;
  stateDueDateField: string;
  constructor() {
    this.isNameValid = false;
    this.isPhoneValid = false;
    this.isAddressValid = false;
    this.isEmailValid = false;
    this.isCardNumberValid = false;
    this.isExpirationDateValid = false;
    this.isCvvValid = false;
    this.stateDueDateField = '';
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
      this.validateAddress(inputElement.value);
    });
    this.modalEmail.addEventListener('input', (e) => {
      const inputElement = e.target as HTMLInputElement;
      this.validateEmail(inputElement.value);
    });
    this.modalConfirmBtn.addEventListener('click', () => {
      this.confirmForm();
    });
    this.modalCardInput.addEventListener('input', (e: Event) => {
      if (!this.modalCardInput) {
        return;
      }
      const event: InputEvent = e as InputEvent;
      const inputElement = e.target as HTMLInputElement;
      const inputString = inputElement.value;
      this.validateCardNumber(inputString);
      const lastChar = inputString.length - 1;
      if (inputString[lastChar] && !inputString[lastChar].match('^[0-9]+$')) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        this.validateCardNumber(inputElement.value);
        return;
      }
      if (inputString.length === 20) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        this.validateCardNumber(inputElement.value);
        return;
      }
      if (event.inputType !== 'deleteContentBackward') {
        if (inputString.length == 5 || inputString.length == 10 || inputString.length == 15) {
          inputElement.value = inputString.slice(0, lastChar) + ' ' + inputString[lastChar];
        }
      }
      this.validateCardNumber(inputElement.value);
    });
    this.modalCardDueDate.addEventListener('input', (e) => {
      if (!this.modalCardDueDate) {
        return;
      }
      const inputElement = e.target as HTMLInputElement;
      const inputString = inputElement.value;
      this.stateDueDateField = inputString;
      this.validateExpirationDate(inputString);
      if (inputString.length === 6) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        this.validateExpirationDate(inputElement.value);
        return;
      }
      const lastChar = this.stateDueDateField.length - 1;
      if (inputString[lastChar] && !inputString[lastChar].match('^[0-9]+$')) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        this.validateExpirationDate(inputElement.value);
        return;
      }
      if (inputString.length === 2 && !inputString.includes('/')) {
        inputElement.value += '/';
      }
      this.validateExpirationDate(inputElement.value);
    });
    this.modalCardCVV.addEventListener('input', (e) => {
      if (!this.modalCardCVV) {
        return;
      }
      const inputElement = e.target as HTMLInputElement;
      const inputString = inputElement.value;
      this.validateCVV(inputElement.value);
      if (inputString[inputString.length - 1] && !inputString[inputString.length - 1].match('^[0-9]+$')) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        this.validateCVV(inputElement.value);
        return;
      }
      if (inputString.length === 4) {
        inputElement.value = inputElement.value.slice(0, inputElement.value.length - 1);
        this.validateCVV(inputElement.value);
        return;
      }
    });
  }
  private validateName(input: string) {
    if (!input) {
      this.isNameValid = false;
      return;
    }
    const splitName = input.split(' ');
    let result = true;
    splitName.forEach((name) => {
      if (!name.toLowerCase().match('^[a-z]+$') || name.length < 3) {
        result = false;
      }
    });
    if (splitName.length < 2) result = false;
    this.isNameValid = result;
  }
  private validatePhone(input: string) {
    if (input[0] !== '+' || !input) {
      this.isPhoneValid = false;
      return;
    }
    const numbers = input.slice(1);
    if (
      numbers &&
      numbers.match('^[0-9]+$') &&
      numbers.length >= MIN_LENGTH_PHONE &&
      numbers.length <= MAX_LENGTH_PHONE
    ) {
      this.isPhoneValid = true;
    } else {
      this.isPhoneValid = false;
    }
  }
  private validateAddress(input: string) {
    if (!input) {
      this.isAddressValid = false;
      return;
    }
    const splitAddres = input.split(' ');
    let result = true;
    splitAddres.forEach((address) => {
      if (address.length < 5) result = false;
    });
    if (splitAddres.length < 3) result = false;
    this.isAddressValid = result;
  }
  public validateEmail(input: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input && re.test(input)) {
      this.isEmailValid = true;
    } else {
      this.isEmailValid = false;
    }
  }
  private validateCardNumber(input: string) {
    this.updatePaymentIcon(+input[0]);
    if (input.length === 19) {
      this.isCardNumberValid = true;
    } else {
      this.isCardNumberValid = false;
    }
  }
  private validateCVV(input: string) {
    if (input.length === 3) {
      this.isCvvValid = true;
    } else {
      this.isCvvValid = false;
    }
  }
  private validateExpirationDate(input: string) {
    if (input.length === 5) {
      const dateString = input.split('/');
      if (
        dateString[0] &&
        dateString[1] &&
        +dateString[0] >= 1 &&
        +dateString[0] <= 12 &&
        +dateString[1] >= 1 &&
        +dateString[1] <= 31
      ) {
        this.isExpirationDateValid = true;
      }
    } else {
      this.isExpirationDateValid = false;
    }
  }
  private confirmForm() {
    this.showErrors();
    const container = document.querySelector('.root');
    if (
      this.modalEmail &&
      this.modalAdress &&
      this.isNameValid &&
      this.isPhoneValid &&
      this.isEmailValid &&
      this.isAddressValid &&
      this.isCardNumberValid &&
      this.isExpirationDateValid &&
      this.isCvvValid
    ) {
      this.cleanLocalStorage();
      if (container) {
        if (!this.modalWindow || !this.modalContent) {
          return;
        }
        this.modalWindow.classList.remove('active');
        this.modalContent.classList.remove('active');
        container.innerHTML = `<div style="margin-top: 100px;font-size: 48px;text-align: center;">Покупка прошла успешно</div>`;
        const basketCount: HTMLDivElement | null = document.querySelector('.basket__count');
        const headerCart: HTMLDivElement | null = document.querySelector('.header__cart > span');
        if (basketCount && headerCart) {
          basketCount.innerHTML = `$0.00`;
          headerCart.textContent = '0';
        }
      }
      setTimeout(() => {
        window.location.href = '/';
      }, 3500);
    }
  }
  private cleanLocalStorage() {
    localStorage.removeItem('rs-store');
  }
  private updatePaymentIcon(firstDigit: number) {
    const paySystem = document.querySelector('.modal__paysystem');
    const imgIcon = document.createElement('img');
    if (paySystem) {
      paySystem.innerHTML = '';
      switch (firstDigit) {
        case 4:
          imgIcon.src = visaIcon;
          paySystem.append(imgIcon);
          break;
        case 5:
          imgIcon.src = masterCardIcon;
          paySystem.append(imgIcon);
          break;
        case 2:
          imgIcon.src = mirIcon;
          paySystem.append(imgIcon);
          break;
        default:
          paySystem.innerHTML = 'CARD';
          break;
      }
    }
  }
  private showErrors() {
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach((item) => {
      item.classList.add('hidden');
    });
    if (!this.isNameValid) {
      const nameError = document.querySelector('.error__name');
      if (nameError) {
        nameError.classList.remove('hidden');
      }
    }
    if (!this.isPhoneValid) {
      const phoneError = document.querySelector('.error__phone');
      if (phoneError) {
        phoneError.classList.remove('hidden');
      }
    }
    if (!this.isAddressValid) {
      const addressError = document.querySelector('.error__adress');
      if (addressError) {
        addressError.classList.remove('hidden');
      }
    }
    if (!this.isEmailValid) {
      const emailError = document.querySelector('.error__email');
      if (emailError) {
        emailError.classList.remove('hidden');
      }
    }
    if (!this.isCardNumberValid) {
      const cardNumberError = document.querySelector('.error__cardnumber');
      if (cardNumberError) {
        cardNumberError.classList.remove('hidden');
      }
    }
    if (!this.isExpirationDateValid) {
      const expirationError = document.querySelector('.error__duedate');
      if (expirationError) {
        expirationError.classList.remove('hidden');
      }
    }
    if (!this.isCvvValid) {
      const cvvError = document.querySelector('.error__cvv');
      if (cvvError) {
        cvvError.classList.remove('hidden');
      }
    }
  }
  public showModal() {
    if (!this.modalWindow || !this.modalContent) {
      return;
    }
    this.modalWindow.classList.add('active');
    this.modalContent.classList.add('active');
  }
}
