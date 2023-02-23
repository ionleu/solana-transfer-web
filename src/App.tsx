import React, { useCallback, useState } from "react";

import { Button, TextInput } from "./components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { emitNotification } from "./services";

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

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
      console.log("signature", signature);

      await connection.confirmTransaction(signature, "processed");

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
