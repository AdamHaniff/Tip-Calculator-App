import { useState } from "react";

// VARIABLES
const percentages = ["5%", "10%", "15%", "25%", "50%"];
const MAX_BILL_VALUE = 10000;
const MAX_CUSTOM_TIP = 100;
const MAX_NUMBER_PEOPLE = 50;

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

function calculateAmount(
  adjustedTipSelected,
  adjustedBill,
  adjustedNumberOfPeople,
  customTipPercentage,
  isTipOnly
) {
  let amount;
  const customTip = customTipPercentage * 100;
  const skipCalculation =
    adjustedNumberOfPeople === 0 ||
    adjustedBill > MAX_BILL_VALUE ||
    adjustedNumberOfPeople > MAX_NUMBER_PEOPLE ||
    customTip > MAX_CUSTOM_TIP;

  if (skipCalculation) {
    amount = 0;
  } else {
    const tipPercentage = adjustedTipSelected || customTipPercentage || 0;
    if (isTipOnly) {
      amount = (adjustedBill * tipPercentage) / adjustedNumberOfPeople;
    } else {
      amount =
        (adjustedBill + adjustedBill * tipPercentage) / adjustedNumberOfPeople;
    }
  }

  return amount.toFixed(2);
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
  const isDefaultState =
    bill === "" &&
    numberOfPeople === "" &&
    tipSelected === null &&
    customTip === "" &&
    tipDivSelected === null;

  const {
    adjustedTipSelected,
    adjustedBill,
    adjustedNumberOfPeople,
    customTipPercentage,
  } = convertInputs(tipSelected, bill, numberOfPeople, customTip);

  const tipAmount = calculateAmount(
    adjustedTipSelected,
    adjustedBill,
    adjustedNumberOfPeople,
    customTipPercentage,
    true
  );

  const totalAmount = calculateAmount(
    adjustedTipSelected,
    adjustedBill,
    adjustedNumberOfPeople,
    customTipPercentage,
    false
  );

  const resetBtnProps = {
    setBill,
    setNumberOfPeople,
    setTipSelected,
    setCustomTip,
    setTipDivSelected,
    isDefaultState,
  };

  // ERROR VARIABLES
  const numberOfPeopleError = setNumberOfPeopleError();
  const billExceedsMaxError =
    adjustedBill > MAX_BILL_VALUE ? "Limit: $10,000" : false;
  const customTipExceedsMaxError =
    Number(customTip) > MAX_CUSTOM_TIP ? "Limit: 100%" : false;

  // FUNCTIONS
  function setNumberOfPeopleError() {
    let error = false;

    if (numberOfPeople === "0") {
      error = "Can't be zero";
    }

    if (adjustedNumberOfPeople > MAX_NUMBER_PEOPLE) {
      error = "Limit: 50";
    }

    return error;
  }

  // HANDLER FUNCTIONS
  function handleChange(value, setter) {
    if (isNaN(Number(value))) return;
    setter(value);
  }

  function handleBillChange(value) {
    // Allow only two decimal places
    if (value.includes(".")) {
      const parts = value.split(".");
      if (parts[1].length > 2) return;
    }

    // Restrict length if there is no decimal point
    if (!value.includes(".") && value.length > 5) return;

    handleChange(value, setBill);
  }

  function handlePeopleChange(value) {
    if (value.length > 2) return;

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
    if (value.length > 3) return;
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
          error={billExceedsMaxError}
        />
        <TipSelection
          handleCustomTip={handleCustomTip}
          customTip={customTip}
          onClick={handleTipDivClick}
          tipDivSelected={tipDivSelected}
          error={customTipExceedsMaxError}
        />
        <Input
          label="Number of People"
          src="images/icon-person.svg"
          alt="Person icon"
          value={numberOfPeople}
          onChange={handlePeopleChange}
          error={numberOfPeopleError}
        />
      </Inputs>

      <Calculate resetBtn={<ResetBtn {...resetBtnProps} />}>
        <CalculateLabel label="Tip Amount" value={tipAmount} />
        <CalculateLabel label="Total" value={totalAmount} />
      </Calculate>
    </div>
  );
}

function Inputs({ children }) {
  return <div className="inputs">{children}</div>;
}

function Input({ label, src, alt, value, onChange, error }) {
  const [isFocused, setIsFocused] = useState(false);

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

function TipSelection({
  handleCustomTip,
  customTip,
  onClick,
  tipDivSelected,
  error,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="tips">
      <span className="tips__select-tip">Select Tip %</span>
      <div className="tips__container">
        {percentages.map((percentage, i) => (
          <div
            key={percentage}
            className={`tips__tip ${tipDivSelected === i ? "bg-topaz" : ""}`}
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

function Calculate({ children, resetBtn }) {
  return (
    <div className="calculate">
      <div className="calculate__container">
        <div className="calculate__labels">{children}</div>
        {resetBtn}
      </div>
    </div>
  );
}

function CalculateLabel({ label, value }) {
  const isLessThanThousand = Number(value) < 1000;

  return (
    <div className="calculate__labels-value">
      <div
        className={`calculate__label-sublabel ${
          isLessThanThousand ? "responsive-margin-right" : ""
        }`}
      >
        <span className="calculate__label">{label}</span>
        <span className="calculate__sublabel">/ person</span>
      </div>
      <span
        className={`calculate__value ${
          isLessThanThousand ? "larger-font" : ""
        }`}
      >
        ${value}
      </span>
    </div>
  );
}

function ResetBtn({
  setBill,
  setNumberOfPeople,
  setTipSelected,
  setCustomTip,
  setTipDivSelected,
  isDefaultState,
}) {
  function handleReset(e) {
    // Reset all state back to their default values
    setBill("");
    setNumberOfPeople("");
    setTipSelected(null);
    setCustomTip("");
    setTipDivSelected(null);
  }

  return (
    <button
      className={`calculate__reset-btn ${!isDefaultState ? "bg-topaz" : ""}`}
      type="button"
      onClick={handleReset}
    >
      Reset
    </button>
  );
}
