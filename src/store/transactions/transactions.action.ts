import { createAsyncThunk } from "@reduxjs/toolkit";

import { getTransactions, saveTransaction } from "../../services";
import { IGetTransactionAction, ITransaction } from "../../models";

const DOMAIN = "TRANSACTIONS";
const SAVE_ACTION = "SAVE_TRANSACTION";
const GET_ACTION = "GET_TRANSACTIONS";

export const saveTransactionAction = createAsyncThunk(
  `${DOMAIN}/${SAVE_ACTION}`,
  async (payload: ITransaction, thunkAPI) => {
    try {
      await saveTransaction(payload);
      return payload;
    } catch (e: any) {
      let messageCode = "UNKNOW";

      if (e?.response) {
        const { message } = e.response.data;
        messageCode = message;
      }

      return thunkAPI.rejectWithValue(messageCode);
    }
  }
);

export const getTransactionsAction = createAsyncThunk(
  `${DOMAIN}/${GET_ACTION}`,
  async ({ publicKey, connection, query }: IGetTransactionAction, thunkAPI) => {
    try {
      return await getTransactions(publicKey, connection, query);
    } catch (e: any) {
      let messageCode = "UNKNOW";

      if (e?.response) {
        const { message } = e.response.data;
        messageCode = message;
      }

      return thunkAPI.rejectWithValue(messageCode);
    }
  }
);
