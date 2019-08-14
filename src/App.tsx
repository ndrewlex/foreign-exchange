import React, { FunctionComponent } from "react";
import CurrencyExchange from "./views/currency-exchange/";
import "./App.css";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <CurrencyExchange />
    </div>
  );
};

export default App;
