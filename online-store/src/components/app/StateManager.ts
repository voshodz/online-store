interface FilterState {
  max: number;
  min: number;
}
export class StateManager {
  state: FilterState;
  constructor() {
    this.state = {
      max: 100,
      min: 1,
    };
  }
  printFilterState() {
    console.log(this.state);
  }
}
