import CurrencyStore from "./currency";

export default class Store {
  currency: CurrencyStore;

  constructor() {
    this.currency = new CurrencyStore();
  }
}
