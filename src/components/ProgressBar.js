import React from "react";

const ProgressBar = ({ step }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`line ${step >= 2 ? "active" : ""}`}></div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`line ${step >= 3 ? "active" : ""}`}></div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
      </div>
    </div>
  );
};

export default ProgressBar;
