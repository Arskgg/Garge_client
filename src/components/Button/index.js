import React from "react";
import "./style.scss";

const Button = ({ children, onClick }) => {
  return (
    <div className="buttonContainer">
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default Button;
