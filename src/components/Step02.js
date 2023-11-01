import React from "react";
import { useAccount } from "wagmi";

function Step02({ setTwitterUrl, warnings }) {
  const { address } = useAccount();
  const tweetContent = `Hey, I’m using the @ModeNetwork faucet to mint @Mode_Domains. You can get testnet ETH from the faucet here: https://faucet.modedomains.xyz/`;
  //   const tweetContent = "demo";
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    tweetContent
  )}`;

  const handleTweetClick = () => {
    window.open(twitterUrl, "_blank");
  };

  const handleTweetCheck = (e) => {
    setTwitterUrl(e.target.value);
  };

  return (
    <div className="step_1">
      <h1>Share a tweet to get faucet! 🤝🏻</h1>
      <p>Tweet and share the URL below</p>
      <p onClick={handleTweetClick} className="tweet_link">
        Generate the tweet for me and I'll share!
      </p>
      <div className="tweet-input-div">
        <span>Tweet URL</span>
        <div className="tweet-input">
          <input
            type="text"
            placeholder="Tweeted URL"
            onChange={(e) => handleTweetCheck(e)}
          />
          {/* <button className="claim-faucet">Claim 0.1 ETH</button> */}
        </div>
      </div>
      {warnings.secondStep ? (
        <p className="error_msg">{warnings.secondStep}</p>
      ) : null}
    </div>
  );
}

export default Step02;
