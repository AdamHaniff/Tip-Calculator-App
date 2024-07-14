import { useState } from "react";

const percentages = ["5%", "10%", "15%", "25%", "50%"];

function convertPercentage(percentage) {
  const number = parseInt(percentage, 10);
  return isNaN(number) ? 0 : number / 100;
}

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
  // STATE
  const [bill, setBill] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [tipSelected, setTipSelected] = useState(null);
  const [customTip, setCustomTip] = useState("");

  // VARIABLES
  const customTipPercentage = convertPercentage(customTip);

  const tipAmount = calculateTipAmount(
    tipSelected,
    bill,
    numberOfPeople,
    customTipPercentage
  );

  const totalAmount = tipSelected
    ? bill + (bill * tipSelected) / numberOfPeople
    : bill + (bill * customTipPercentage) / numberOfPeople;

  function calculateTipAmount(
    tipSelected,
    bill,
    numberOfPeople,
    customTipPercentage
  ) {
    // const tipAmount = tipSelected
    //   ? (bill * tipSelected) / numberOfPeople
    //   : (bill * customTipPercentage) / numberOfPeople;
    // return Number.isNaN(tipAmount) ? "0.00" : tipAmount.toFixed(2);
    // I DONT WANT TO HARDCODE THE 0.00 - WILL CHECK IF EACH VALUE EXISTS
  }

  // HANDLER FUNCTIONS
  function handleChange(value, setter) {
    if (isNaN(Number(value))) return;
    setter(value === "" ? "" : Number(value));
  }

  function handleBillChange(value) {
    handleChange(value, setBill);
  }

  function handlePeopleChange(value) {
    handleChange(value, setNumberOfPeople);
  }

  function handleTipSelected(value) {
    setTipSelected(value);
    setCustomTip("");
  }

  function handleCustomTip(value) {
    if (isNaN(Number(value))) return;
    setCustomTip(value === "" ? "" : Number(value));
    setTipSelected(null);
  }

  return (
    <div className="app">
      <Inputs>
        <Input
          label="Bill"
          src="images/icon-dollar.svg"
          alt="Dollar icon"
          value={bill}
          onChange={handleBillChange}
        />
        <TipSelection
          handleTipSelected={handleTipSelected}
          handleCustomTip={handleCustomTip}
          customTip={customTip}
        />
        <Input
          label="Number of People"
          src="images/icon-person.svg"
          alt="Person icon"
          value={numberOfPeople}
          onChange={handlePeopleChange}
        />
      </Inputs>

      <Calculate>
        <CalculateLabel label="Tip Amount" value={tipAmount} />
        <CalculateLabel label="Total" value={totalAmount} />
      </Calculate>
    </div>
  );
}

function Inputs({ children }) {
  return <div className="inputs">{children}</div>;
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

function TipSelection({ handleTipSelected, handleCustomTip, customTip }) {
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

function Calculate({ children }) {
  return (
    <div className="calculate">
      <div className="calculate__container">
        <div className="calculate__labels">{children}</div>
        <button className="calculate__reset-btn" type="button">
          Reset
        </button>
      </div>
    </div>
  );
}

function CalculateLabel({ label, value }) {
  return (
    <div className="calculate__labels-value">
      <div className="calculate__label-sublabel">
        <span className="calculate__label">{label}</span>
        <span className="calculate__sublabel">/ person</span>
      </div>
      <span className="calculate__value">${value}</span>
    </div>
  );
}
