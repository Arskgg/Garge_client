import React from "react";
import styles from "./PostCard.module.scss";
import { cars } from "../../../../data/brands";

const PostCard = ({ post }) => {
  const carLogo = cars.find(
    (car) => car.make.toLowerCase() === post.carMake.toLowerCase()
  )?.img;

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__img}>
          <img
            src={process.env.REACT_APP_API_URL + post.imgs[0]}
            alt={post.imgs[0]}
          />
        </div>

        <div className={styles.card__details}>
          <div className={styles.card__user_img}>
            <img
              src={process.env.REACT_APP_API_URL + post.imgs[0]}
              alt={post.imgs[0]}
            />
          </div>
          <div className={styles.card__username}>username</div>
        </div>

        <div className={styles.card__car_info}>
          {carLogo && (
            <div className={styles.card__car_logo}>
              <img src={carLogo} alt="Car logo" />
            </div>
          )}

          <div className={styles.card__car_make}>{post.carMake}</div>
          <div className={styles.card__car_model}>{post.carModel}</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
