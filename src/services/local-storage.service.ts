import { Storelify } from "storelify";
import { Connection, PublicKey } from "@solana/web3.js";

import { ITransaction } from "../models";
import { getSolanaTransactions } from "./solana.service";

const db = new Storelify("__sth");

/**
 * @name saveTransaction
 * @description
 * Save transaction to the local db
 *
 * @param {ITransaction} transaction - A object containing all required transaction details
 */
export const saveTransaction = (transaction: ITransaction) => {
  const transactions: ITransaction[] = db.get("transations") || [];

  db.set("transations", [
    ...transactions,
    { ...transaction, createdAt: Date.now() },
  ]);
};

/**
 * @name getTransactions
 * @description
 * Get transactions
 *
 * @param {PublicKey} publicKey - A unique PublicKey for tests and benchmarks
 * @param {Connection} connection - A connection to a fullnode JSON RPC endpoint
 * @param {query} query - A search query
 *
 * @returns {ITransaction[]} - A list of transactions
 */
export const getTransactions = async (
  publicKey: PublicKey,
  connection: Connection,
  query?: string
): Promise<ITransaction[]> => {
  const procesedTransactions: Record<string, boolean> = {};
  const buildTransactions: ITransaction[] = [];
  const dbTransactions: ITransaction[] = db.get("transations") || [];
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

  return !query?.trim()
    ? buildTransactions
    : buildTransactions.filter((t: any) =>
        Object.keys(t).some((key: string) =>
          t[key]?.toLowerCase()?.includes(query.toLowerCase())
        )
      );
};

/**
 * @name getTransactionDetails
 * @description
 * Get transaction details
 *
 * @param {string} signature - A unique signature of selected transaction
 * @param {ITransaction[]} transactions - A list of transactions
 *
 * @returns {ITransaction} - A transaction details object
 */
export const getTransactionDetails = (
  signature: string,
  transactions: ITransaction[]
) => transactions.filter((t: ITransaction) => t.signature === signature);
