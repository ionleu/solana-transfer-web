import { Storelify } from "storelify";
import { Connection, PublicKey } from "@solana/web3.js";

import { ITransaction } from "../models";
import { getSolanaTransactions } from "./solana.service";

const db = new Storelify("__sth");

export const saveTransaction = async (transaction: ITransaction) => {
  const transactions: ITransaction[] = db.get("transations") || [];

  db.set("transations", [
    ...transactions,
    { ...transaction, createdAt: Date.now() },
  ]);
};

export const getTransactions = async (
  publicKey: PublicKey,
  connection: Connection
) => {
  const a = await getSolanaTransactions(publicKey, connection);
  console.log("a", a);

  return a;
};
