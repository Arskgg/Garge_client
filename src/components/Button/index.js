import styles from "./Button.module.scss";

const Button = ({ children, onClick, outlined, disabled, red }) => {
  return (
    <div
      className={`${outlined ? styles.buttonOutlined : styles.buttonFilled} ${
        disabled && styles.buttonDisabled
      } ${red && styles.buttonRed}`}
    >
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
