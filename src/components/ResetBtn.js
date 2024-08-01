import { useState } from "react";

export default function ResetBtn({
  setBill,
  setNumberOfPeople,
  setTipSelected,
  setCustomTip,
  setTipDivSelected,
  isDefaultState,
}) {
  // STATE
  const [isHovered, setIsHovered] = useState(false);

  // HANDLER FUNCTIONS
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  function handleReset() {
    // Reset all state back to their default values
    setIsHovered(false);
    setBill("");
    setNumberOfPeople("");
    setTipSelected(null);
    setCustomTip("");
    setTipDivSelected(null);
  }

  return (
    <button
      className={`calculate__reset-btn ${!isDefaultState ? "bg-topaz" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      type="button"
      onClick={handleReset}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Reset
    </button>
  );
}
