import { ethers } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import DiscordService from "../services/DiscordService";
import ReCAPTCHA from "react-google-recaptcha";

function Step03({ addressInput, setShowConfetti, showConfetti }) {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLowBalanceMsg, setLowBalanceMsg] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef(null);

  const { Send } = DiscordService();

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
    // fetchBalance();
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
    const inputVal = "";
    const token = captchaToken;
    try {
      // Make a POST request to your API endpoint
      const humanCheck = await fetch(
        "https://recaptcha-dusky.vercel.app/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, inputVal }),
        }
      );
      // Parse the response
      const data = await humanCheck.text();

      // Update the result state based on the API response
      console.log(data);
      if (data) {
        const response = await fetch("https://modedomains.vercel.app/drip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipientAddress }),
        });

        if (response.ok) {
          // discord msg
          Send(
            ` 🎉 Congratulations! ${
              recipientAddress.slice(0, 7) +
              "..." +
              recipientAddress.slice(
                recipientAddress.length - 5,
                recipientAddress.length
              )
            } just claimed the faucet 0.03 ETH ! 🎉`
          );

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
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred while processing your request.");
      setMessage("");
      setReceipt("");
    }
    // finally {
    //   setCaptchaToken("");
    // }
  };

  const handleCaptchaChange = (value) => {
    // console.log(value);
    setCaptchaToken(value);
  };
  return (
    <div className="step_1">
      <h1 className={showLowBalanceMsg ? "disabled" : ""}>
        Yayy! You can claim faucet.
      </h1>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_SITE_KEY}
        ref={captchaRef}
        onChange={handleCaptchaChange}
        theme="dark"
        className={showLowBalanceMsg ? "disabled recaptcha" : "recaptcha"}
      />
      {!captchaToken ? (
        <p className="error_msg">
          Complete the captcha to claim faucet rewards.
        </p>
      ) : null}
      <button
        className={
          showConfetti || showLowBalanceMsg || !captchaToken
            ? "claim-faucet disabled"
            : "claim-faucet"
        }
        onClick={handleDrip}
      >
        {showConfetti ? "Claimed" : loading ? "Claiming..." : "Claim 0.03 ETH"}
      </button>
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
      ) : null}
    </div>
  );
}

export default Step03;
