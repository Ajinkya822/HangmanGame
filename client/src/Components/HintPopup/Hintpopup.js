import React from "react";
import "./Hintpopup.css";

const HintPopup = ({ hint, closePopup }) => {
  return (
    <div className="hint-popup">
      <div className="hint-popup-content">
        <span className="hint-popup-close" onClick={closePopup}>
          &times;
        </span>
        <p>{hint}</p>
      </div>
    </div>
  );
};

export default HintPopup;
