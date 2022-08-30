import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children, onClick, outlined }) => {
  return (
    <div className={outlined ? styles.buttonOutlined : styles.buttonFilled}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default Button;
