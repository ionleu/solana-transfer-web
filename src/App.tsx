import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import {
  Message,
  Modal,
  Table,
  TransactionDetails,
  TransferForm,
  SearchInput,
} from "./components";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getTransactionsAction } from "./store/transactions";
import { TRANSACTION_COLUMNS, TRANSACTION_HEADER_LABELS } from "./constants";

function App() {
  const dispatch = useAppDispatch();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const {
    transactions,
    isLoading,
    error: transactionError,
  } = useAppSelector((state) => state.transactionsReducer);
  const [selectedTransaction, setSelectedTransaction] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      if (!publicKey) return;

      await dispatch(getTransactionsAction({ publicKey, connection }));
    };
    init();
  }, [publicKey, connection]);

  return (
    <div className="container">
      <TransferForm />

      <div className="columns mt-5">
        <div
          className="column is-7 is-offset-1"
          style={{ padding: "1.2rem 0" }}
        >
          <h3>Transaction History</h3>
          <p>Choose a transaction to see more details about it.</p>
        </div>
        <div className="column is-3 search">
          <SearchInput
            placeholder="Search for transactions"
            onEmit={async (keyword: string) => {
              if (!publicKey) return;
              await dispatch(
                getTransactionsAction({ publicKey, connection, query: keyword })
              );
            }}
          />
        </div>
      </div>

      <div className="columns mb-5">
        <div
          className="column is-10 is-offset-1 main"
          style={{
            marginTop: "unset",
            padding: isLoading || transactions.length === 0 ? "1.2rem" : 0,
          }}
        >
          {transactions.length === 0 && !isLoading && (
            <Message content="No transactions in your history yet OR make sure you connected your wallet." />
          )}

          {transactions.length === 0 && !isLoading && !!transactionError && (
            <Message content="Something went wrong on fetching your account transaction history." />
          )}

          {isLoading && (
            <Message content="Transactions history is loading..." />
          )}

          {!!transactions.length && !isLoading && (
            <>
              <Table
                onRowClick={(signature: string) => {
                  setSelectedTransaction(signature);
                }}
                data={transactions}
                headers={TRANSACTION_HEADER_LABELS}
                columns={TRANSACTION_COLUMNS}
              />
            </>
          )}
        </div>
      </div>

      <Modal
        title="Transaction details"
        show={!!selectedTransaction}
        onClose={() => {
          setSelectedTransaction("");
        }}
      >
        <TransactionDetails
          signature={selectedTransaction}
          transactions={transactions}
        />
      </Modal>
    </div>
  );
}

export default App;
