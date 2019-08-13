import React, { FunctionComponent } from "react";
import CurrencyExchange from "./views/currency-exchange/";
import "./App.css";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <h1>App</h1>
      <CurrencyExchange />
    </div>
  );
};

export default App;
