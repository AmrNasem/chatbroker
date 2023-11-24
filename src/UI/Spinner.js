import classes from "./Spinner.module.css";

const Spinner = ({
  side = 50,
  stroke = 5,
  className,
  color = "var(--main-color)",
}) => {
  return (
    <div
      style={{
        width: side,
        height: side,
        border: `${stroke}px solid ${color}`,
      }}
      className={`rounded-circle ${classes.spinner} ${className}`}
    ></div>
  );
};

export default Spinner;
