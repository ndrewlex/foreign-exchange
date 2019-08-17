import { ExchangeRatesApi } from "./../utils/config";

export const fetchCurrencyRates = async ({
  baseCurrency = "USD",
  symbols = "IDR"
}: any) => {
  try {
    const response = await fetch(
      `${ExchangeRatesApi}/latest?base=${baseCurrency}&symbols=${symbols}`
    );
    const json = await response.json();
    return Promise.resolve(json);
  } catch (err) {
    return Promise.reject(err);
  }
};
