import React from "react";
import WheelIco from "../../assets/car-wheel.svg";
import "./styles.scss";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <img src={WheelIco} alt="Wheel" />
      </div>
    </>
  );
};

export default Loading;
