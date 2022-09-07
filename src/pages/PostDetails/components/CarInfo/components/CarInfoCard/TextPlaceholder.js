import React from "react";
import styles from "./TextPlaceholder.module.scss";

const TextPlaceholder = ({ title, description }) => {
  return (
    <div className={styles.text_container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default TextPlaceholder;
