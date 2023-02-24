import { FC, useEffect, useState } from "react";

import { getTransactionDetails } from "../../services";
import { ITransaction } from "../../models";
import { ellipsis } from "../../utils";

export const TransactionDetails: FC<{
  signature: string;
  transactions: ITransaction[];
}> = (props): JSX.Element => {
  const { signature, transactions } = props;
  const [transaction, setTransaction] = useState<ITransaction>();

  useEffect(() => {
    const result = getTransactionDetails(signature, transactions);
    setTransaction(result[0]);
  }, [signature]);

  return (
    <div className="columns">
      {transaction?.signature ? (
        <>
          <div className="column">
            <label>Signature</label>
            <p className="mb-4">{ellipsis(transaction.signature, 15)}</p>

            <label>Created</label>
            <p className="mb-4">{transaction.createdAt}</p>

            <label>Solscan</label>
            <p className="mb-4">
              <a
                href={`https://solscan.io/tx/${transaction.signature}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
              >
                view
              </a>
            </p>

            <label>Solana Explorer</label>
            <p className="mb-4">
              <a
                href={`https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
              >
                view
              </a>
            </p>
          </div>
          <div className="column">
            {transaction?.to && (
              <>
                <label>Destination</label>
                <p className="mb-4">{ellipsis(transaction.to, 15)}</p>
              </>
            )}

            {transaction?.amount && (
              <>
                <label>Amount (SOL)</label>
                <p className="mb-4">{transaction.amount}</p>
              </>
            )}

            <label>Status</label>
            <p className="mb-4" style={{ textTransform: "capitalize" }}>
              {transaction.status}
            </p>
          </div>
        </>
      ) : (
        <p>No transaction details available</p>
      )}
    </div>
  );
};
