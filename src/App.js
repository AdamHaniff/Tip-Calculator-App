import { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <Header />
      <CalculatorApp />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src="images/logo.svg"
        alt="Splitter logo"
      ></img>
    </header>
  );
}

function CalculatorApp() {
  return (
    <div className="app">
      <Inputs />
      <Calculate />
    </div>
  );
}

function Inputs() {
  const [bill, setBill] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");

  function handleBillChange(value) {
    setBill(value);
  }

  function handlePeopleChange(value) {
    setNumberOfPeople(value);
  }

  return (
    <div className="inputs">
      <Input
        label="Bill"
        src="images/icon-dollar.svg"
        alt="Dollar icon"
        value={bill}
        onChange={handleBillChange}
      />
      <TipSelection />
      <Input
        label="Number of People"
        src="images/icon-person.svg"
        alt="Person icon"
        value={numberOfPeople}
        onChange={handlePeopleChange}
      />
    </div>
  );
}

function Input({ label, src, alt, value, onChange }) {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <div className="input__container">
        <img className="input__icon" src={src} alt={alt} />
        <input
          className="input__element"
          type="text"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function TipSelection() {
  const [tipSelected, setTipSelected] = useState(null);
  const [customTip, setCustomTip] = useState("");
  const customTipPercentage = convertPercentage(customTip);

  function handleTipSelected(value) {
    setTipSelected(value);
    setCustomTip("");
  }

  function handleCustomTip(value) {
    if (isNaN(Number(value))) return;
    setCustomTip(value === "" ? "" : Number(value));
    setTipSelected(null);
  }

  const percentages = ["5%", "10%", "15%", "25%", "50%"];

  function convertPercentage(percentage) {
    const number = parseInt(percentage, 10);
    return isNaN(number) ? 0 : number / 100;
  }

  return (
    <div className="tips">
      <span className="tips__select-tip">Select Tip %</span>
      <div className="tips__container">
        {percentages.map((percentage) => (
          <div
            key={percentage}
            className="tips__tip"
            onClick={() => handleTipSelected(convertPercentage(percentage))}
          >
            {percentage}
          </div>
        ))}
        <input
          className="tips__custom-tip"
          type="text"
          placeholder="Custom"
          value={customTip}
          onChange={(e) => handleCustomTip(e.target.value)}
        />
      </div>
    </div>
  );
}

function Calculate() {
  return (
    <div className="calculate">
      <div className="calculate__container">
        <div className="calculate__labels">
          <CalculateLabel label="Tip Amount" />
          <CalculateLabel label="Total" />
        </div>
        <button className="calculate__reset-btn" type="button">
          Reset
        </button>
      </div>
    </div>
  );
}

function CalculateLabel({ label }) {
  return (
    <div className="calculate__labels-value">
      <div className="calculate__label-sublabel">
        <span className="calculate__label">{label}</span>
        <span className="calculate__sublabel">/ person</span>
      </div>
      <span className="calculate__value">$4.27</span>
    </div>
  );
}
