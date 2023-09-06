import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function Step03({ addressInput, setShowConfetti, showConfetti }) {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <h1>Yayy! You can claim faucet.</h1>

      <button
        className={showConfetti ? "claim-faucet disabled" : "claim-faucet"}
        onClick={handleDrip}
      >
        {showConfetti ? "Claimed" : loading ? "Claiming..." : "Claim 0.05 ETH"}
      </button>

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
      ) : null}
    </div>
  );
}

export default Step03;
