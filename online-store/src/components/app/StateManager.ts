import { dispatchType, FilterState } from '../../domain/IState';

export class StateManager {
  private state: FilterState;
  constructor() {
    this.state = {
      filteredArray: [],
      brandType: [],
      maxPrice: 100,
      minPrice: 1,
    };
  }

  private setState(newState: dispatchType) {
    this.state = { ...this.state, ...newState };
  }
  dispatchState(dispatchedState: dispatchType) {
    this.setState(dispatchedState);
    //так как вызвалось изменение состояние, надо вызвать функцию фильтрации, filterLogic папка
    //чистая функция котоаря принимает FilterState, и выдаёт данные в зависимости от массива
    //далее отфильтрованные отдаются Views, там уже дом манипуляции
  }
  printFilterState() {
    console.log(this.state);
  }
}
