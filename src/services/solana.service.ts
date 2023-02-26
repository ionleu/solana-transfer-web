import { Connection, PublicKey } from "@solana/web3.js";

import { getFormattedDateString } from "../utils";

const PAGE_LIMIT = 100;

/**
 * @name getSolanaTransactions
 * @description
 * Get Solana transactions
 *
 * @param {PublicKey} publicKey - A unique PublicKey for tests and benchmarks
 * @param {Connection} connection - A connection to a fullnode JSON RPC endpoint
 *
 * @returns {Partial<ITransaction[]>} - A list of transactions
 */
export const getSolanaTransactions = async (
  publicKey: PublicKey | null,
  connection: Connection
) => {
  if (!publicKey) return;

  const transactions = await connection.getSignaturesForAddress(publicKey, {
    limit: PAGE_LIMIT,
  });

  return transactions.map((transaction: any) => ({
    createdAt: getFormattedDateString(new Date(transaction.blockTime * 1000)),
    signature: transaction.signature,
    status: transaction.confirmationStatus,
  }));
};
