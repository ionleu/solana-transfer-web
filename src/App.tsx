import React from "react";

import { Button, TextInput, WalletAdapterContext } from "./components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function App() {
  return (
    <WalletAdapterContext>
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth main">
            <h1>Transfer SOL</h1>
            <WalletMultiButton />
            <div className="content my-5">
              <div className="form">
                <TextInput
                  label="How much?"
                  type="number"
                  placeholder="Enter the amount"
                  classes={["sm", "mr-2"]}
                  onChange={() => {}}
                />

                <TextInput
                  label="To whom?"
                  placeholder="Enter the address token"
                  classes={["md"]}
                  onChange={() => {}}
                />
              </div>

              <div className="transfer mt-3">
                <Button title="Transfer" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletAdapterContext>
  );
}

export default App;
