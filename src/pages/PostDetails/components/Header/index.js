import React from "react";
import styles from "./PostDetails.module.scss";
import { getCarLogoImg } from "../../../../utils/carLogoImages";
import { motion } from "framer-motion";
import { isBrowser } from "react-device-detect";

function Header({ post }) {
  const carLogo = getCarLogoImg(post.carMake) || null;

  return (
    <motion.header
      className={styles.header}
      initial={
        isBrowser && {
          background:
            "linear-gradient(rgb(0, 0, 0),rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.85),rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.85),rgba(0,0, 0, 0.9),rgb(0, 0, 0))",
        }
      }
      animate={isBrowser && { background: "rgb(10,10,10)" }}
      transition={{ delay: "1", duration: "0.5", ease: "easeOut" }}
    >
      <div className={styles.header__container}>
        <motion.div
          style={
            !post?.acceleration &&
            !post?.hp &&
            !post?.topSpeed && {
              height: "100%",
            }
          }
          className={`${styles.header__car_info} ${styles.car_info}`}
          initial={isBrowser && { x: "94%" }}
          animate={{ x: "0" }}
          transition={{ delay: "2", duration: "1", ease: "easeOut" }}
        >
          <motion.div
            className={styles.car_info__car_logo}
            initial={{ opacity: 0, y: "-150px" }}
            animate={{ opacity: 1, y: "0" }}
            transition={{ duration: "1", ease: "easeOut" }}
          >
            {carLogo && <img src={carLogo} alt="Car Logo" />}
          </motion.div>
          <motion.div
            className={styles.car_info__text_container}
            initial={{ opacity: 0, y: "150px" }}
            animate={{ opacity: 1, y: "0" }}
            transition={{ duration: "1", ease: "easeOut" }}
          >
            <div className={styles.car_info__car_make}>{post.carMake}</div>
            <div className={styles.car_info__car_model}>{post.carModel}</div>
          </motion.div>

          <motion.div
            className={styles.car_info__letter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: "1", duration: "1", ease: "easeOut" }}
          >
            {post.carMake.charAt(0)}
          </motion.div>
        </motion.div>

        <div className={styles.header__car_content}>
          <motion.div
            className={styles.header__car_img}
            initial={isBrowser && { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: "2.5", duration: "1", ease: "easeOut" }}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/${post.imgs[0]}`}
              alt="Car Img"
            />
          </motion.div>
        </div>

        {(post.acceleration || post.hp || post.topSpeed) && (
          <motion.div
            className={`${styles.header__car_tech_specs} ${styles.tech_specs}`}
            initial={
              isBrowser
                ? { opacity: 0, x: "100px" }
                : { opacity: 0, y: "100px" }
            }
            animate={
              isBrowser ? { opacity: 1, x: "0" } : { opacity: 1, y: "0" }
            }
            transition={
              isBrowser
                ? { delay: "2.5", duration: "0.5", ease: "easeOut" }
                : { duration: "1", ease: "easeOut" }
            }
          >
            {post.acceleration && (
              <div className={styles.tech_specs__acceleration}>
                <div className={styles.tech_specs__title}>
                  {post.acceleration} sec
                </div>
                <div className={styles.tech_specs__subtitle}>From 0-60 MPH</div>
              </div>
            )}

            {post.hp && (
              <div className={styles.tech_specs__hp}>
                <div className={styles.tech_specs__title}>{post.hp} hp</div>
                <div className={styles.tech_specs__subtitle}>Horsepower</div>
              </div>
            )}

            {post.topSpeed && (
              <div className={styles.tech_specs__top_speed}>
                <div className={styles.tech_specs__title}>
                  {post.topSpeed} mph
                </div>
                <div className={styles.tech_specs__subtitle}>Top Speed</div>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          className={styles.header__grradient}
          initial={isBrowser && { visibility: "hidden" }}
          animate={{ visibility: "visible" }}
          transition={{ delay: "2.5", duration: "1", ease: "easeOut" }}
        ></motion.div>
      </div>
    </motion.header>
  );
}

export default Header;
