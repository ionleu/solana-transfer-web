import React, { FC, useCallback, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

import { Button, Notification, TextInput } from "../ui";
import { saveTransactionAction, setIsAdding } from "../../store/transactions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFormattedDateString } from "../../utils";
import { emitNotification } from "../../services";

export const TransferForm: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { isAdding } = useAppSelector((state) => state.transactionsReducer);
  const [amount, setAmount] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [signature, setSignature] = useState<string>("");

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
  );
};
