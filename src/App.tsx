import React, { useCallback, useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import {
  Button,
  Message,
  Modal,
  Notification,
  Table,
  TextInput,
  TransactionDetails,
} from "./components";
import { emitNotification } from "./services";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getFormattedDateString } from "./utils";
import {
  getTransactionsAction,
  saveTransactionAction,
  setIsAdding,
} from "./store/transactions";

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [selectedTransaction, setSelectedTransaction] = useState<string>("");
  const dispatch = useAppDispatch();
  const {
    transactions,
    isLoading,
    isAdding,
    error: transactionError,
  } = useAppSelector((state) => state.transactionsReducer);
  console.log("transactions", transactions.length);

  useEffect(() => {
    const init = async () => {
      if (!publicKey || isAdding) return;

      await dispatch(getTransactionsAction({ publicKey, connection }));
    };
    init();
  }, [publicKey, connection]);

  const onTransferSOL = useCallback(async () => {
    try {
      dispatch(setIsAdding(true));

      if (!publicKey) throw new WalletNotConnectedError();
      if (!destination || !amount)
        throw new Error("Missing destination or amount values");

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(destination),
          lamports: +amount * 1e9,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      setSignature(signature);

      await connection.confirmTransaction(signature, "processed");
      await dispatch(
        saveTransactionAction({
          to: destination,
          signature,
          amount,
          createdAt: getFormattedDateString(new Date()),
          status: "processed",
        })
      );

      emitNotification("success", "Transfer was sent successfully.");
      setAmount("");
      setDestination("");
    } catch (e: any) {
      emitNotification("error", e?.message);
    } finally {
      dispatch(setIsAdding(false));
    }
  }, [publicKey, connection, amount, destination]);

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth main">
          <h1>Transfer SOL</h1>

          <div className="content my-5">
            <div className="form">
              <TextInput
                label="How much?"
                type="number"
                placeholder="Enter the amount"
                classes={["sm", "mr-2"]}
                value={amount}
                onChange={(value: string) => {
                  setAmount(value);
                }}
              />

              <TextInput
                label="To whom?"
                placeholder="Enter the address token"
                classes={["md"]}
                value={destination}
                onChange={(value: string) => {
                  setDestination(value);
                }}
              />
            </div>

            <div className="transfer mt-3">
              {!publicKey ? (
                <WalletMultiButton
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <Button
                  title="Transfer"
                  onClick={onTransferSOL}
                  isLoading={isAdding}
                />
              )}
            </div>

            <Notification
              show={!!signature}
              onClose={() => {
                setSignature("");
              }}
            >
              <a
                href={`https://solscan.io/tx/${signature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Successful airdrop, view transaction on Solscan.
              </a>
            </Notification>
          </div>
        </div>
      </div>

      <div className="columns mt-5">
        <div
          className="column is-10 is-offset-1"
          style={{ padding: "1.2rem 0" }}
        >
          <h3>Transaction History</h3>
          <p>Choose a transaction to see more details about it.</p>
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
            <Message content="No transactions in your history yet." />
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
                headers={[
                  "Signature",
                  "Created",
                  "Destination",
                  "Amount (SOL)",
                  "Status",
                  "Solscan",
                  "Solana Explorer",
                ]}
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
