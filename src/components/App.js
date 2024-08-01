import Header from "./Header";
import CalculatorApp from "./CalculatorApp";
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
