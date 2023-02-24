import React from "react";
import ReactDOM from "react-dom/client";
import * as buffer from "buffer";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-hooks-web";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AutoConnectProvider, WalletAdapterContext } from "./components";

import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/index.css";

window.Buffer = buffer.Buffer;
const searchClient = algoliasearch(
  "EGC7JX4FX1",
  "e8e38a24c93aa59d07533b63cf14afb5"
);

// const index = searchClient.initIndex("sth_dev");

// index
//   .saveObjects([{ test: "test" }], { autoGenerateObjectIDIfNotExist: true })
//   .then(({ objectIDs }) => {
//     console.log(objectIDs);
//   });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <InstantSearch searchClient={searchClient} indexName="sth_dev">
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
