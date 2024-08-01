import Inputs from "./Inputs";
import Input from "./Input";
import TipSelection from "./TipSelection";
import Calculate from "./Calculate";
import CalculateLabel from "./CalculateLabel";
import ResetBtn from "./ResetBtn";

import { useState } from "react";

export default function CalculatorApp() {
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
    adjustedBill > MAX_BILL_VALUE ? "Limit: $10,000" : "";
  const customTipExceedsMaxError =
    Number(customTip) > MAX_CUSTOM_TIP ? "Limit: 100%" : "";

  // FUNCTIONS
  function setNumberOfPeopleError() {
    let error = "";

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
