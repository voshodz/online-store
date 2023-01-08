enum ValidationField {
  Name,
  Phone,
  Address,
  Email,
  CreditCard,
}
import visaIcon from '../../assets/img/iconpayment/visa.png';
import masterCardIcon from '../../assets/img/iconpayment/master.png';
import mirIcon from '../../assets/img/iconpayment/mir2.png';
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
  stateCardNumber: boolean;
  stateExpDate: boolean;
  stateCVV: boolean;
  stateDueDateField: string;
  constructor() {
    this.stateName = false;
    this.statePhone = false;
    this.stateAddress = false;
    this.stateEmail = false;
    this.stateCardNumber = false;
    this.stateExpDate = false;
    this.stateCVV = false;
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
    this.modalCardInput.addEventListener('input', (e) => {
      if (!this.modalCardInput) {
        return;
      }
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
      if (inputString.length == 4 || inputString.length == 9 || inputString.length == 14) {
        inputElement.value += ' ';
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
      return;
    }
    const numbers = input.slice(1);
    if (numbers && numbers.match('^[0-9]+$') && numbers.length >= 9) {
      this.statePhone = true;
    } else {
      this.statePhone = false;
    }
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
  }
  private validateCardNumber(input: string) {
    this.updatePaymentIcon(+input[0]);
    if (input.length === 19) {
      this.stateCardNumber = true;
    } else {
      this.stateCardNumber = false;
    }
  }
  private validateCVV(input: string) {
    if (input.length === 3) {
      this.stateCVV = true;
    } else {
      this.stateCVV = false;
    }
  }
  private validateExpirationDate(input: string) {
    if (input.length === 5) {
      const dateString = input.split('/');
      dateString[0] = dateString[0].replace('', '0');
      if (dateString[0] && dateString[1] && +dateString[0] >= 1 && +dateString[0] <= 12) this.stateExpDate = true;
    } else {
      this.stateExpDate = false;
    }
  }
  printstateName() {
    console.log(this.stateName);
  }
  private confirmForm() {
    this.showErrors();
    const container = document.querySelector('.root');
    if (
      this.modalEmail &&
      this.modalAdress &&
      this.stateName &&
      this.statePhone &&
      this.stateEmail &&
      this.stateAddress &&
      this.stateCardNumber &&
      this.stateExpDate &&
      this.stateCVV
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
    if (!this.stateName) {
      const nameError = document.querySelector('.error__name');
      if (nameError) {
        nameError.classList.remove('hidden');
      }
    }
    if (!this.statePhone) {
      const phoneError = document.querySelector('.error__phone');
      if (phoneError) {
        phoneError.classList.remove('hidden');
      }
    }
    if (!this.stateAddress) {
      const addressError = document.querySelector('.error__adress');
      if (addressError) {
        addressError.classList.remove('hidden');
      }
    }
    if (!this.stateEmail) {
      const emailError = document.querySelector('.error__email');
      if (emailError) {
        emailError.classList.remove('hidden');
      }
    }
    if (!this.stateCardNumber) {
      const cardNumberError = document.querySelector('.error__cardnumber');
      if (cardNumberError) {
        cardNumberError.classList.remove('hidden');
      }
    }
    if (!this.stateExpDate) {
      const expirationError = document.querySelector('.error__duedate');
      if (expirationError) {
        expirationError.classList.remove('hidden');
      }
    }
    if (!this.stateCVV) {
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
