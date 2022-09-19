import React from "react";
import WheelIco from "../../assets/car-wheel.svg";
import styles from "./Loading.module.scss";

const Loading = ({ solo }) => {
  return (
    <>
      <div className={`${styles.loading} ${solo && styles.loading_solo}`}>
        <img src={WheelIco} alt="Wheel" />
      </div>
    </>
  );
};

export default Loading;
