import { useState } from "react";

export default function Input({ label, src, alt, value, onChange, error }) {
  // STATE
  const [isFocused, setIsFocused] = useState(false);

  // HANDLER FUNCTIONS
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="input">
      <div className="input__label-error">
        <label className="input__label">{label}</label>
        {error && <span className="input__error">{error}</span>}
      </div>
      <div className="input__container">
        <img className="input__icon" src={src} alt={alt} />
        <input
          className={`input__element ${
            error ? "error" : isFocused ? "focused" : ""
          }`}
          type="text"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
