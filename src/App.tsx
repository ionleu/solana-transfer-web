import React, { useCallback, useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import { Button, Notification, Table, TextInput } from "./components";
import { emitNotification, getTransactions, saveTransaction } from "./services";
import { ITransaction } from "./models";
import { getFormattedDateString } from "./utils";

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signature, setSignature] = useState<string>("");
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        if (!publicKey) return;

        const result: any = await getTransactions(publicKey, connection);
        setTransactions(result);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [publicKey, connection]);

  const onTransferSOL = useCallback(async () => {
    try {
      setIsSending(true);
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
      const processedTransaction: ITransaction = {
        to: destination,
        signature,
        amount,
        createdAt: getFormattedDateString(new Date()),
        status: "processed",
      };
      saveTransaction(processedTransaction);
      setTransactions((prev) => [processedTransaction, ...prev]);
      emitNotification("success", "Transfer was sent successfully.");
      setAmount("");
      setDestination("");
    } catch (e: any) {
      emitNotification("error", e?.message);
    } finally {
      setIsSending(false);
    }
  }, [publicKey, sendTransaction, connection, amount, destination]);

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
                  isLoading={isSending}
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
                Successful airdrop, view transaction on Solana Explorer.
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
            <p style={{ textAlign: "center" }}>
              No transactions in your history yet.
            </p>
          )}

          {isLoading && (
            <p style={{ textAlign: "center" }}>
              Transactions history is loading...
            </p>
          )}

          {!!transactions.length && !isLoading && (
            <>
              <Table
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
    </div>
  );
}

export default App;
