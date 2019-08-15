import { useState, ChangeEvent, SyntheticEvent } from "react";
import { createContainer } from "unstated-next";

const useCurrency = () => {
  const [baseValue, setBaseValue] = useState<any>("10.00");
  const [allRates, setAllRates] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [visibleRates, setVisibleRates] = useState<any>([]);
  const [dropDownData, setDropDownData] = useState<any>([]);
  const [newRate, setNewRate] = useState<any>(null);

  const fetchData = async () => {
    const allCurrencyRates = await fetchAllCurrencyRates();
    setAllRates(allCurrencyRates);
    setDropDownData(
      allCurrencyRates.map((item: any) => {
        return {
          key: item.currency,
          value: item.currency,
          text: item.currency
        };
      })
    );
    setVisibleRates(allCurrencyRates.slice(0, 4));
    setLoading(false);
  };

  const updateAllCurrencyRates = async () => {
    const allCurrencyRates = await fetchAllCurrencyRates();
    setAllRates(allCurrencyRates);
  };

  const fetchAllCurrencyRates = async () => {
    const base = "USD";
    const symbols = "CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW";
    const response = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`
    );
    const json = await response.json();
    let allCurrencyRates: any = [];
    for (let currency in json.rates) {
      allCurrencyRates.push({
        currency,
        rate: json.rates[currency]
      });
    }
    return allCurrencyRates;
  };

  const onChangeValue = (event: ChangeEvent, data: any) => {
    event.preventDefault();
    setBaseValue(data.value);
  };

  const onChangeNewRate = (event: SyntheticEvent, data: any) => {
    event.preventDefault();
    const selectedRate = allRates.find(
      (item: any) => item.currency === data.value
    );
    if (selectedRate) {
      setNewRate(selectedRate);
    }
  };

  const onAddRate = (event: SyntheticEvent) => {
    event.preventDefault();
    if (newRate != null) {
      updateAllCurrencyRates();
      const isExist = visibleRates.find((item: any) => {
        return item.currency === newRate.currency;
      });
      !isExist &&
        newRate !== null &&
        setVisibleRates([...visibleRates, newRate]);
    }
  };

  const onDeleteRate = (event: any, index: any) => {
    event.preventDefault();
    let copyOfVisibleRates = visibleRates;
    copyOfVisibleRates.splice(index, 1);
    console.log({ copyOfVisibleRates });
    setVisibleRates([...copyOfVisibleRates]);
  };

  return {
    loading,
    baseValue,
    visibleRates,
    dropDownData,
    fetchData,
    onChangeValue,
    onChangeNewRate,
    onAddRate,
    onDeleteRate
  };
};

export const CurrencyContainer = createContainer(useCurrency);
