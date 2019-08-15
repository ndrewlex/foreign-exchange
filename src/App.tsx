import React, { FunctionComponent } from "react";
import CurrencyExchange from "./views/currency-exchange/";
import { CurrencyContainer } from "./stores/index";
import "./App.css";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <CurrencyContainer.Provider>
        <CurrencyExchange />
      </CurrencyContainer.Provider>
    </div>
  );
};

export default App;
