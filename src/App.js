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
import ThreeJsComponent from "./components/ThreeJsComponent";

function App() {
  const { address } = useAccount();
  const [addressInput, setAddressInput] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  const twitterUrlRegex = /^https:\/\/x\.com\/\w+\/status\/\d+(\?.*)?$/;
  const oldtwitterUrlRegex =
    /^https:\/\/twitter\.com\/\w+\/status\/\d+(\?.*)?$/;
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
          firstStep: "Please connect you wallet",
          secondStep: "",
          thirdStep: "",
        });
      }
    }
    if (step === 2) {
      if (
        twitterUrlRegex.test(twitterUrl) ||
        oldtwitterUrlRegex.test(twitterUrl)
      ) {
        setStep(step + 1);
      } else {
        setWarnings({
          ...warnings,
          secondStep: "Please enter the correct tweeted URL",
        });
      }
    }
    if (step === 3) {
      setStep(step + 1);
    }
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
      forthStep: "",
    });
  }, [address, addressInput, twitterUrl]);
  return (
    <div className="App">
      <nav className="navbar">
        <span>Mode Faucet</span>
      </nav>
      {/* <div className="canvas-component" id="canvas-parent">
        <ThreeJsComponent />
      </div> */}
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
                disabled={step === 4}
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
        <div className="social-media">
          <svg
            viewBox="0,0,256,256"
            width="50px"
            height="50px"
            onClick={() => window.open("https://twitter.com/Mode_Domains")}
          >
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path>
              </g>
            </g>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 127.14 96.36"
            onClick={() => window.open("https://discord.gg/XdmEgUDGGf")}
          >
            <path
              fill="#fff"
              d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
