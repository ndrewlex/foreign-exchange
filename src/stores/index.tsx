import { useState, ChangeEvent, SyntheticEvent } from "react";
import { createContainer } from "unstated-next";
import { ExchangeRatesApi } from "../utils/config";

const useCurrency = () => {
  const baseCurrency = "USD";
  const [baseValue, setBaseValue] = useState<any>("10.00");
  const [allRates, setAllRates] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [listData, setListData] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const fetchData = async () => {
    try {
      const allCurrencyRates = await fetchAllCurrencyRates();
      setAllRates(allCurrencyRates);
      setOptions(
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

  const onChangeBaseValue = (event: ChangeEvent, data: any) => {
    event.preventDefault();
    setBaseValue(data.value);
  };

  const onChangeSelectedOption = (event: SyntheticEvent, data: any) => {
    event.preventDefault();
    const selectedRate = allRates.find(
      (item: any) => item.currency === data.value
    );
    if (selectedRate) {
      setSelectedOption(selectedRate);
    }
  };

  const onAddList = async (event: SyntheticEvent) => {
    event.preventDefault();
    const isExist = listData.find((item: any) => {
      return item.currency === selectedOption.currency;
    });
    if (!isExist && selectedOption !== null) {
      setListData([...listData, selectedOption]);
      filterOptions([...listData, selectedOption]);
      setSelectedOption(null);
    }
  };

  const onDeleteList = (event: any, index: any) => {
    event.preventDefault();
    let copyOfListData = listData;
    copyOfListData.splice(index, 1);
    filterOptions(copyOfListData);
    setListData([...copyOfListData]);
    setSelectedOption(null);
  };

  const onAddMoreCurrency = (event: SyntheticEvent) => {
    event.preventDefault();
    filterOptions(listData);
  };

  //filterOptions to prevent added duplicate currency in list
  const filterOptions = (listData: any) => {
    const data = allRates.filter((item: any) => !listData.includes(item));
    setOptions(
      data.map((item: any) => {
        return {
          key: item.currency,
          value: item.currency,
          text: item.currency
        };
      })
    );
    setSelectedOption(data[0]);
  };

  return {
    loading,
    baseValue,
    listData,
    options,
    fetchData,
    onChangeBaseValue,
    onChangeSelectedOption,
    onAddList,
    onDeleteList,
    baseCurrency,
    selectedOption,
    setSelectedOption,
    onAddMoreCurrency
  };
};

export const CurrencyContainer = createContainer(useCurrency);
