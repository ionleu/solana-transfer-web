import { Connection, PublicKey } from "@solana/web3.js";

import { ITransaction } from "./transaction.model";

export interface ITransactionsState {
  transactions: ITransaction[];
  isLoading: boolean;
  isAdding: boolean;
  error: string;
}

export interface IGetTransactionAction {
  publicKey: PublicKey;
  connection: Connection;
  query?: string;
}
