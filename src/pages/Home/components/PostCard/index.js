import React from "react";
import styles from "./PostCard.module.scss";
import { cars } from "../../../../data/brands";
import { POST_DETAILS_ROUTE } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const carLogo = cars.find(
    (car) => car.make.toLowerCase() === post.carMake.toLowerCase()
  )?.img;

  const handleOpenPost = (e) => {
    navigate("/post/" + post._id);
  };

  return (
    <div onClick={handleOpenPost} className={styles.card}>
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
