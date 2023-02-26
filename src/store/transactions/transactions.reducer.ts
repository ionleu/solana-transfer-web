import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITransaction, ITransactionsState } from "../../models";
import {
  getTransactionsAction,
  saveTransactionAction,
} from "./transactions.action";

const initialState: ITransactionsState = {
  transactions: [],
  isLoading: false,
  isAdding: false,
  error: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setIsAdding(state: ITransactionsState, action: PayloadAction<boolean>) {
      state.isAdding = action.payload;
    },
  },
  extraReducers: {
    [saveTransactionAction.fulfilled.type]: (
      state: ITransactionsState,
      action: PayloadAction<ITransaction>
    ) => {
      state.transactions.unshift(action.payload);
      state.isAdding = false;
    },
    [saveTransactionAction.pending.type]: (state: ITransactionsState) => {
      state.isAdding = true;
    },
    [saveTransactionAction.rejected.type]: (
      state: ITransactionsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isAdding = false;
    },

    [getTransactionsAction.fulfilled.type]: (
      state: ITransactionsState,
      action: PayloadAction<ITransaction[]>
    ) => {
      state.transactions = action.payload;
      state.isLoading = false;
    },
    [getTransactionsAction.pending.type]: (state: ITransactionsState) => {
      state.isLoading = true;
    },
    [getTransactionsAction.rejected.type]: (
      state: ITransactionsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const { setIsAdding } = transactionsSlice.actions;
