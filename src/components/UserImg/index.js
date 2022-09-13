import React from "react";
import styles from "./UserImg.module.scss";

const UserImg = ({ username }) => {
  return (
    <div className={styles.user_image}>
      <div className={styles.user_image__container}>
        <div className={styles.user_image__username}>
          {username.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default UserImg;
