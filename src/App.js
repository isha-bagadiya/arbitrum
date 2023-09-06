import logo from "./logo.svg";
import "./App.css";
import img1 from "../src/asset/images/under_construction-removebg-preview.png";
import Lottie from "react-lottie";
import animationData from "../src/asset/animationData.json";
import { useEffect, useState } from "react";
// import the progress bar
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import Confetti from "react-confetti";

import "./styles/Steps.css";
import Step01 from "./components/Step01";
import { useAccount } from "wagmi";
import ProgressBar from "./components/ProgressBar";
import StepContent from "./components/StepContent";

function App() {
  const { address } = useAccount();
  const [addressInput, setAddressInput] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  const twitterUrlRegex = /^https:\/\/twitter\.com\/\w+\/status\/\d+.*$/;

  const [warnings, setWarnings] = useState({
    firstStep: "",
    secondStep: "",
    thirdStep: "",
  });
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // }
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      if (address || addressInput) {
        if (
          ethereumAddressRegex.test(address) ||
          ethereumAddressRegex.test(addressInput)
        ) {
          setStep(step + 1);
        }
      } else {
        setWarnings({
          firstStep:
            "Please enter correct wallet address or connect you wallet",
          secondStep: "",
          thirdStep: "",
        });
      }
    }
    if (step === 2) {
      if (twitterUrlRegex.test(twitterUrl)) {
        setStep(step + 1);
      } else {
        setWarnings({
          ...warnings,
          secondStep: "Please enter the correct tweeted URL",
        });
      }
    }
    // if (step < 3) {
    //   setStep(step + 1);
    // }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  useEffect(() => {
    setWarnings({
      firstStep: "",
      secondStep: "",
      thirdStep: "",
    });
  }, [address, addressInput, twitterUrl]);
  return (
    <div className="App">
      <nav className="navbar">
        <span>Mode Faucet</span>
      </nav>
      <div className="main_container">
        <div className="card_container">
          <div className="custom-stepper">
            <ProgressBar step={step} />
            <StepContent
              step={step}
              setAddressInput={setAddressInput}
              warnings={warnings}
              addressInput={addressInput}
              setTwitterUrl={setTwitterUrl}
              setShowConfetti={setShowConfetti}
              showConfetti={showConfetti}
            />
            <div className="button-container">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className="previous"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={step === 3}
                className="next"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfetti ? (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      ) : null}
      <div className="footer">
        <span>
          Donate ETH with ❤️ to : 0x8BeE50Ad14f8f8F64F8e0E6541A5B87dd45E67C0
        </span>
      </div>
    </div>
  );
}

export default App;
