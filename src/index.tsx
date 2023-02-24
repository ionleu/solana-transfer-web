import React from "react";
import ReactDOM from "react-dom/client";
import * as buffer from "buffer";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AutoConnectProvider, WalletAdapterContext } from "./components";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";

import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/index.css";

window.Buffer = buffer.Buffer;
const searchClient = algoliasearch("YourApplicationID", "YourSearchOnlyAPIKey");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <InstantSearch searchClient={searchClient} indexName="instant_search">
    <AutoConnectProvider>
      <WalletAdapterContext>
        <App />
      </WalletAdapterContext>
    </AutoConnectProvider>
  </InstantSearch>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
