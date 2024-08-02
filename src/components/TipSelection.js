import { useState } from "react";

const percentages = ["5%", "10%", "15%", "25%", "50%"];

export default function TipSelection({
  handleCustomTip,
  customTip,
  onClick,
  tipDivSelected,
  error,
}) {
  // STATE
  const [isFocused, setIsFocused] = useState(false);

  // HANDLER FUNCTIONS
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="tips">
      <span className="tips__select-tip">Select Tip %</span>
      <div className="tips__container">
        {percentages.map((percentage, i) => (
          <div
            key={percentage}
            className={`tips__tip ${tipDivSelected === i ? "selected" : ""}`}
            onClick={() => onClick(percentage, i)}
          >
            {percentage}
          </div>
        ))}
        <div className="tips__custom-tip-error">
          <input
            className={`tips__custom-tip ${
              error ? "error" : isFocused ? "focused" : ""
            }`}
            type="text"
            placeholder="Custom"
            value={customTip}
            onChange={(e) => handleCustomTip(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {error && <span className="tips__error">{error}</span>}
        </div>
      </div>
    </div>
  );
}
