export default function Calculate({ children, resetBtn }) {
  return (
    <div className="calculate">
      <div className="calculate__container">
        <div className="calculate__labels">{children}</div>
        {resetBtn}
      </div>
    </div>
  );
}
