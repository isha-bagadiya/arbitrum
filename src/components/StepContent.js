import React from "react";
import Step01 from "./Step01";
import Step02 from "./Step02";
import Step03 from "./Step03";

const StepContent = ({
  step,
  setAddressInput,
  warnings,
  addressInput,
  setTwitterUrl,
  setShowConfetti,
  showConfetti,
}) => {
  switch (step) {
    case 1:
      return (
        <div>
          <Step01
            setAddressInput={setAddressInput}
            warnings={warnings}
            addressInput={addressInput}
          />
        </div>
      );
    case 2:
      return (
        <div>
          <Step02 setTwitterUrl={setTwitterUrl} warnings={warnings} />
        </div>
      );
    case 3:
      return (
        <div>
          <Step03
            addressInput={addressInput}
            warnings={warnings}
            setShowConfetti={setShowConfetti}
            showConfetti={showConfetti}
          />
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;
