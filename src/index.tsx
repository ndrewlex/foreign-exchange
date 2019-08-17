import React from "react";
import ReactDOM from "react-dom";
import App from "./views/currency-exchange/index";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import Stores from "./stores/store";
import { CurrencyContainer } from "./stores/index";

const stores = new Stores();

const Root = (
  <Provider currency={stores.currency}>
    <CurrencyContainer.Provider>
      <App />
    </CurrencyContainer.Provider>
  </Provider>
);
ReactDOM.render(Root, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
