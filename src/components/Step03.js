import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function Step03({ addressInput, setShowConfetti, showConfetti }) {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLowBalanceMsg, setLowBalanceMsg] = useState(true);

  useEffect(() => {
    const Main_address = "0x8BeE50Ad14f8f8F64F8e0E6541A5B87dd45E67C0";
    const provider = new ethers.providers.JsonRpcProvider(
      "https://sepolia.mode.network/"
    );
    const fetchBalance = async () => {
      try {
        const balanceWei = await provider.getBalance(Main_address);
        const balanceEther = ethers.utils.formatEther(balanceWei);

        if (balanceEther < 0.035) {
          setLowBalanceMsg(true);
        } else {
          setLowBalanceMsg(false);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    if (address) {
      setRecipientAddress(address);
    } else if (addressInput) {
      setRecipientAddress(addressInput);
    }
  }, [address, addressInput]);

  const handleDrip = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://modedomains.vercel.app/drip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientAddress }),
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setMessage(data.message);
        setReceipt(data.receipt);
        setShowConfetti(true);
        setError(null);
      } else {
        setLoading(false);
        const errorData = await response.json();
        setError(errorData.message);
        setMessage("");
        setReceipt("");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred while processing your request.");
      setMessage("");
      setReceipt("");
    }
  };
  return (
    <div className="step_1">
      <h1 className={showLowBalanceMsg ? "disabled" : ""}>
        Yayy! You can claim faucet.
      </h1>
      <button
        className={
          showConfetti || showLowBalanceMsg
            ? "claim-faucet disabled"
            : "claim-faucet"
        }
        onClick={handleDrip}
      >
        {showConfetti ? "Claimed" : loading ? "Claiming..." : "Claim 0.03 ETH"}
      </button>{" "}
      <p className="twitter-follow">
        Follow us at
        <a href="https://twitter.com/Mode_Domains" target="_blanck">
          {" "}
          @Mode_Domains
        </a>
      </p>
      {showLowBalanceMsg ? (
        <div className="lb_div err_msg_div">
          <span className="lb_title">
            Oops! The Faucet is Taking a Coffee Break! ☕
          </span>
          <p className="lb_msg">
            Looks like the faucet is out of ETH for now. It's taking a coffee
            break! Try again later.
          </p>
        </div>
      ) : null}
      {message || receipt || error ? (
        <div className="err_msg_div">
          {message && <p className="message">{message}</p>}
          {receipt && (
            <p className="tx_hash">
              TxHash:{" "}
              <a
                href={`https://sepolia.explorer.mode.network/tx/${receipt}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {receipt}
              </a>
            </p>
          )}
          {error && <p className="error_msg">Error : {error}</p>}
        </div>
      ) : null}{" "}
    </div>
  );
}

export default Step03;
