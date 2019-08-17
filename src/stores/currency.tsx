import { SyntheticEvent } from "react";
import { observable, action, computed } from "mobx";
import { fetchCurrencyRates } from "./../services/exchange";

class CurrencyStore {
  @observable base = {
    id: "USD",
    value: "10.00"
  };
  @observable symbols: any = "CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW";
  @observable list: any = [];
  @observable dropdown: any = [];
  @observable loading = true;
  @observable all: any = [];
  @observable selectedDropdown: any = null;
  @observable dropdownValue: any = "";

  @action setBaseValue(value: any) {
    this.base.value = value;
  }

  @action setDropdownValue(value: any) {
    console.log({ value });
    this.dropdownValue = value;
  }

  @action onChangeDropdown(event: SyntheticEvent, data: any) {
    this.dropdownValue = data.value;
  }

  @computed get isListEmpty() {
    return this.list.length === 0;
  }

  @computed get isDropDownEmpty() {
    return this.dropdown.length === 0;
  }

  mapResponse(response: any) {
    let array: any = [];
    for (let currency in response.rates) {
      array.push({
        currency,
        rate: response.rates[currency]
      });
    }
    return array;
  }

  @action async fetchInitialData() {
    try {
      const response = await fetchCurrencyRates({
        base: this.base.id,
        symbols: this.symbols
      });
      if (response) {
        const mappedResponse = this.mapResponse(response);

        this.all = mappedResponse;

        //set default dropdown data
        this.dropdown = mappedResponse.map((item: any) => {
          return {
            key: item.currency,
            value: item.currency,
            text: item.currency
          };
        });

        //set default list data
        this.list = mappedResponse.slice(0, 4);

        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  @action onDelete(event: any, index: any) {
    this.list.splice(index, 1);
    this.selectedDropdown = null;
  }

  @action filterDropDown = () => {
    const data = this.all.filter((item: any) => !this.list.includes(item));
    this.dropdown = data.map((item: any) => {
      return {
        key: item.currency,
        value: item.currency,
        text: item.currency
      };
    });
    this.selectedDropdown = this.dropdown[0].value;
  };

  @action onAddMoreCurrency = async (event: SyntheticEvent) => {
    event.preventDefault();
    this.filterDropDown();
  };
}

export default CurrencyStore;
