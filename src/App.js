import { useState } from "react";

// VARIABLES
const percentages = ["5%", "10%", "15%", "25%", "50%"];

// FUNCTIONS
function convertPercentage(percentage) {
  const number = parseInt(percentage, 10);
  return isNaN(number) ? 0 : number / 100;
}

function convertInputs(tipSelected, bill, numberOfPeople, customTip) {
  // Convert parameters to numbers
  const adjustedTipSelected = Number(tipSelected);
  const adjustedBill = Number(bill);
  const adjustedNumberOfPeople = Number(numberOfPeople);
  const customTipPercentage = convertPercentage(customTip);

  return {
    adjustedTipSelected,
    adjustedBill,
    adjustedNumberOfPeople,
    customTipPercentage,
  };
}

function calculateTipAmount(
  adjustedTipSelected,
  adjustedBill,
  adjustedNumberOfPeople,
  customTipPercentage
) {
  let tipAmount;

  if (adjustedNumberOfPeople === 0) {
    tipAmount = 0;
  } else {
    tipAmount =
      (adjustedBill * (adjustedTipSelected || customTipPercentage || 0)) /
      adjustedNumberOfPeople;
  }

  return tipAmount.toFixed(2);
}

function calculateTotalAmount(
  adjustedTipSelected,
  adjustedBill,
  adjustedNumberOfPeople,
  customTipPercentage
) {
  let totalAmount;

  if (adjustedNumberOfPeople === 0) {
    totalAmount = 0;
  } else {
    totalAmount =
      (adjustedBill +
        adjustedBill * (adjustedTipSelected || customTipPercentage)) /
      adjustedNumberOfPeople;
  }

  return totalAmount.toFixed(2);
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
  const [tipDivSelected, setTipDivSelected] = useState(null);

  // VARIABLES
  const {
    adjustedTipSelected,
    adjustedBill,
    adjustedNumberOfPeople,
    customTipPercentage,
  } = convertInputs(tipSelected, bill, numberOfPeople, customTip);

  const tipAmount = calculateTipAmount(
    adjustedTipSelected,
    adjustedBill,
    adjustedNumberOfPeople,
    customTipPercentage
  );

  const totalAmount = calculateTotalAmount(
    adjustedTipSelected,
    adjustedBill,
    adjustedNumberOfPeople,
    customTipPercentage
  );

  const isNumberOfPeopleZero = numberOfPeople === "0";

  // HANDLER FUNCTIONS
  function handleChange(value, setter) {
    if (isNaN(Number(value))) return;
    setter(value);
  }

  function handleBillChange(value) {
    handleChange(value, setBill);
  }

  function handlePeopleChange(value) {
    // Allow only whole numbers or an empty string
    const validValue = /^[0-9]*$/.test(value)
      ? value
      : value.replace(/[^0-9]/g, "");

    handleChange(validValue, setNumberOfPeople);
  }

  function handleTipSelected(value) {
    setTipSelected(value);
    setCustomTip("");
  }

  function handleCustomTip(value) {
    if (isNaN(Number(value))) return;
    setCustomTip(value === "" ? "" : Number(value));
    setTipSelected(null);
    setTipDivSelected(null);
  }

  function handleTipDivClick(percentage, i) {
    if (tipDivSelected === i) {
      // If the currently selected tip div is clicked again, deselect it and set 'tipSelected' back to null
      setTipDivSelected(null);
      handleTipSelected(null);
    } else {
      // Select the tip div that was just clicked and update 'tipSelected'
      setTipDivSelected(i);
      handleTipSelected(convertPercentage(percentage));
    }
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
          isError={false}
        />
        <TipSelection
          handleCustomTip={handleCustomTip}
          customTip={customTip}
          onClick={handleTipDivClick}
          tipDivSelected={tipDivSelected}
        />
        <Input
          label="Number of People"
          src="images/icon-person.svg"
          alt="Person icon"
          value={numberOfPeople}
          onChange={handlePeopleChange}
          isError={isNumberOfPeopleZero}
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

function Input({ label, src, alt, value, onChange, isError }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="input">
      <div className="input__label-error">
        <label className="input__label">{label}</label>
        {isError && <span className="input__error">Can't be zero</span>}
      </div>
      <div className="input__container">
        <img className="input__icon" src={src} alt={alt} />
        <input
          className={`input__element ${
            isError
              ? "input__element--error"
              : isFocused
              ? "input__element--focused"
              : ""
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

function TipSelection({ handleCustomTip, customTip, onClick, tipDivSelected }) {
  return (
    <div className="tips">
      <span className="tips__select-tip">Select Tip %</span>
      <div className="tips__container">
        {percentages.map((percentage, i) => (
          <div
            key={percentage}
            className={`tips__tip ${
              tipDivSelected === i ? "tips__tip--selected" : ""
            }`}
            onClick={() => onClick(percentage, i)}
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
