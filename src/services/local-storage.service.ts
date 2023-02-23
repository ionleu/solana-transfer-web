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
  const procesedTransactions: Record<string, boolean> = {};
  const buildTransactions: ITransaction[] = [];
  const dbTransactions: ITransaction[] = db.get("transations");
  const solanaTransactions = await getSolanaTransactions(publicKey, connection);

  if (!solanaTransactions?.length && !dbTransactions.length)
    return buildTransactions;
  if (!solanaTransactions?.length) return dbTransactions;

  for (let i = 0; i < solanaTransactions.length; i++) {
    for (let j = 0; j < dbTransactions.length; j++) {
      if (solanaTransactions[i].signature === dbTransactions[j].signature) {
        procesedTransactions[solanaTransactions[i].signature] = true;

        buildTransactions.push({
          createdAt: solanaTransactions[i].createdAt,
          signature: solanaTransactions[i].signature,
          status: solanaTransactions[i].status,
          amount: dbTransactions[j].amount,
          to: dbTransactions[j].to,
        });
      }
    }

    if (!procesedTransactions[solanaTransactions[i].signature]) {
      buildTransactions.push({
        ...solanaTransactions[i],
        amount: null,
        to: null,
      });
    }
  }

  return buildTransactions;
};
