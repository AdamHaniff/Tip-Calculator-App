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
    </div>
  );
}

function Inputs() {
  return (
    <div className="inputs">
      <Bill />
    </div>
  );
}

function Bill() {
  return (
    <div className="bill">
      <label className="bill__label">Bill</label>
      <div className="bill__input-container">
        <img
          className="bill__dollar-icon"
          src="images/icon-dollar.svg"
          alt="Dollar icon"
        />
        <input className="bill__input" type="text" />
      </div>
    </div>
  );
}

function TipSelection() {
  const percentages = ["5%", "10%", "15%", "25%", "50%"];

  return (
    <div className="tips">
      <span className="tips__select-tip">Select Tip %</span>
      <div className="tips__container">
        {percentages.map((percentage) => (
          <div key={percentage} className="tip">
            {percentage}
          </div>
        ))}
        <input className="tips__custom-tip" type="text" placeholder="Custom" />
      </div>
    </div>
  );
}
