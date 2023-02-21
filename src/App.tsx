import React from "react";

function App() {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth main">
          <h1>Transfer SOL</h1>
          <div className="content my-5">
            <div className="form">
              <div className="control sm mr-2">
                <label>How much?</label>
                <input className="input" type="text" />
              </div>

              <div className="control md">
                <label>To whom?</label>
                <input className="input" type="text" />
              </div>
            </div>

            <div className="transfer mt-3">
              <button className="button is-primary button-action">
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
