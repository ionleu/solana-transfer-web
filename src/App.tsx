import React, { useCallback, useState } from "react";

import { Button, TextInput } from "./components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");

  const onTransferSOL = useCallback(async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();
      // additional check if we have the balance /connection.getBalance(publicKey)
      if (!destination || !amount) return;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(destination),
          lamports: amount * 1_000_000,
        })
      );
      const signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, "processed");
      // add toast success

      setAmount(0);
      setDestination("");
    } catch (e: any) {
      // add toast error
      console.log(e?.message);
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
                onChange={(value: string) => {
                  setAmount(+value);
                }}
              />

              <TextInput
                label="To whom?"
                placeholder="Enter the address token"
                classes={["md"]}
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
                <Button title="Transfer" onClick={onTransferSOL} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
