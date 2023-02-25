import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { transactionsReducer } from "./transactions";

const rootReducer = combineReducers({
  transactionsReducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
