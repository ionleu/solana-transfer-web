import React from "react";
import { Button, TextInput } from "./components/ui";

function App() {
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
  );
}

export default App;
