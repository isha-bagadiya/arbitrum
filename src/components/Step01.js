import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Step01(props) {
  return (
    <div className="step_1">
      <h1>Share your wallet details</h1>
      <p>Connect your wallet!</p>
      <p>Collect 0.03 ETH every 24 hours.</p>
      <div className="connect-btn-wallet-div">
        <ConnectButton />
      </div>
      {/* <p>or</p>
      <div className="wallet-address-div">
        <input
          type="text"
          defaultValue={props.addressInput ? props.addressInput : ""}
          placeholder=" .mode handle(coming soon) or Wallet Address"
          onChange={(e) => props.setAddressInput(e.target.value)}
        />
      </div> */}
      {props.warnings.firstStep ? (
        <p className="error_msg">{props.warnings.firstStep}</p>
      ) : null}
    </div>
  );
}

export default Step01;
