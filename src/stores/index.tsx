import { useState, ChangeEvent, SyntheticEvent } from "react";
import { createContainer } from "unstated-next";
import { ExchangeRatesApi } from "../utils/config";

const useCurrency = () => {
  const baseCurrency = "USD";
  const [baseValue, setBaseValue] = useState<any>("10.00");
  const [allRates, setAllRates] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [listData, setListData] = useState<any>([]);
  const [dropDownData, setDropDownData] = useState<any>([]);
  const [newRate, setNewRate] = useState<any>(null);

  const fetchData = async () => {
    try {
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
      setListData(allCurrencyRates.slice(0, 4)); //add default data to list
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllCurrencyRates = async () => {
    const symbols = "CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW";
    const response = await fetch(
      `${ExchangeRatesApi}/latest?base=${baseCurrency}&symbols=${symbols}`
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

  const onAddRate = async (event: SyntheticEvent) => {
    event.preventDefault();
    const isExist = listData.find((item: any) => {
      return item.currency === newRate.currency;
    });
    if (!isExist && newRate !== null) {
      setListData([...listData, newRate]);
      filterDropDownData([...listData, newRate]);
      setNewRate(null);
    }
  };

  const onAddMoreCurrency = (event: SyntheticEvent) => {
    event.preventDefault();
    filterDropDownData(listData);
  };

  const filterDropDownData = (listData: any) => {
    const data = allRates.filter((item: any) => !listData.includes(item));
    setDropDownData(
      data.map((item: any) => {
        return {
          key: item.currency,
          value: item.currency,
          text: item.currency
        };
      })
    );
    setNewRate(data[0]);
  };

  const onDeleteRate = (event: any, index: any) => {
    event.preventDefault();
    let copyOfListData = listData;
    copyOfListData.splice(index, 1);
    filterDropDownData(copyOfListData);
    setListData([...copyOfListData]);
    setNewRate(null);
  };

  return {
    loading,
    baseValue,
    listData,
    dropDownData,
    fetchData,
    onChangeValue,
    onChangeNewRate,
    onAddRate,
    onDeleteRate,
    baseCurrency,
    newRate,
    setNewRate,
    onAddMoreCurrency
  };
};

export const CurrencyContainer = createContainer(useCurrency);
