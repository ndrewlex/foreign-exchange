import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CurrencyExchange from "./components/currency-exchange/";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <CurrencyExchange />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
