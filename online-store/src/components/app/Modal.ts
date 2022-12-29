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
  state: boolean;
  constructor() {
    this.state = false;
    this.modalWindow = document.querySelector('.modal');
    this.modalContent = document.querySelector('.modal__content');
    this.modalName = document.querySelector('.modal__name');
    if (!this.modalWindow || !this.modalContent || !this.modalName) {
      return;
    }
    this.modalWindow.addEventListener('click', () => {
      if (!this.modalWindow || !this.modalContent) {
        return;
      }
      this.modalWindow.classList.remove('active');
      this.modalContent.classList.remove('active');
      this.modalContent.innerHTML = '';
    });
    this.modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    this.modalName.addEventListener('input', (e) => {
      const inputElement = e.target as HTMLInputElement;
      this.validateInput(inputElement.value);
    });
  }
  private validateInput(input: string) {
    if (!input) {
      this.state = false;
      return;
    }
    const splitName = input.split(' ');
    if (splitName.length !== 2 || !splitName[0] || !splitName[1]) {
      this.state = false;
      this.printState();
      return;
    }
    if (splitName[0].length >= 3 && splitName[1].length >= 3) {
      if (splitName[0].toLowerCase().match('^[a-z]+$') && splitName[1].toLowerCase().match('^[a-z]+$')) {
        this.state = true;
      } else {
        this.state = false;
      }
    }
    this.printState();
    console.log('succes');
  }
  printState() {
    console.log(this.state);
  }
  public showModal() {
    if (!this.modalWindow || !this.modalContent) {
      return;
    }
    this.modalWindow.classList.add('active');
    this.modalContent.classList.add('active');
    const resulInfo = document.createElement('div');
    resulInfo.className = 'modal__result';
    //this.modalContent.innerHTML = '';
    /*
    const nameSpan = document.createElement('span');
    nameSpan.className = 'modal__name';
    nameSpan.innerHTML = bird.name;
    resulInfo.appendChild(nameSpan);
    const nameDescription = document.createElement('span');
    nameDescription.className = 'modal__description';
    nameDescription.innerHTML = bird.description;
    resulInfo.appendChild(nameDescription);

    this.modalContent.appendChild(resulInfo);
    console.log(bird.image);
    this.modalContent.style.background = `url("${bird.image}") center center no-repeat`;
    this.modalContent.style.backgroundSize = `cover`;
    */
  }
}
