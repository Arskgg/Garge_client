import React from "react";
import styles from "./PostDetails.module.scss";
import { getCarLogoImg } from "../../../../utils/carLogoImages";

function Header({ post }) {
  const carLogo = getCarLogoImg(post.carMake) || null;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={`${styles.header__car_info} ${styles.car_info}`}>
          <div className={styles.car_info__car_logo}>
            {carLogo && <img src={carLogo} alt="Car Logo" />}
          </div>
          <div className={styles.car_info__text_container}>
            <div className={styles.car_info__car_make}>{post.carMake}</div>
            <div className={styles.car_info__car_model}>{post.carModel}</div>
          </div>

          <div className={styles.car_info__letter}>
            {post.carMake.charAt(0)}
          </div>
        </div>

        <div className={styles.header__car_content}>
          <div className={styles.header__car_img}>
            <img
              src={process.env.REACT_APP_API_URL + post.imgs[0]}
              alt="Car Img"
            />
          </div>
        </div>
        <div
          className={`${styles.header__car_tech_specs} ${styles.tech_specs}`}
        >
          <div className={styles.tech_specs__acceleration}>
            <div className={styles.tech_specs__title}>
              {post.acceleration} sec
            </div>
            <div className={styles.tech_specs__subtitle}>From 0-60 MPH</div>
          </div>

          <div className={styles.tech_specs__hp}>
            <div className={styles.tech_specs__title}>{post.hp} hp</div>
            <div className={styles.tech_specs__subtitle}>Horsepower</div>
          </div>

          <div className={styles.tech_specs__top_speed}>
            <div className={styles.tech_specs__title}>{post.topSpeed} mph</div>
            <div className={styles.tech_specs__subtitle}>Top Speed</div>
          </div>
        </div>

        <div className={styles.header__grradient}></div>
      </div>
    </header>
  );
}

export default Header;
