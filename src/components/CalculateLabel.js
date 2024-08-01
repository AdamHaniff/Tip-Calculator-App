export default function CalculateLabel({ label, value }) {
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
