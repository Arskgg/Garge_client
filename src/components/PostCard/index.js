import React from "react";
import styles from "./PostCard.module.scss";
import { cars } from "../../data/brands";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/authSlice";
import { getCarLogoImg } from "../../utils/carLogoImages";

const PostCard = ({ post, noUser }) => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const carLogo = getCarLogoImg(post.carMake) || null;

  const handleOpenPost = (e) => {
    navigate("/post/" + post._id);
  };

  const handleEditPost = () => {
    navigate(`update/post/${post._id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div onClick={handleOpenPost} className={styles.card__img}>
          <img
            src={process.env.REACT_APP_API_URL + post.imgs[0]}
            alt={post.imgs[0]}
          />
        </div>

        {!noUser && (
          <div className={styles.card__details}>
            <div className={styles.card__user_img}>
              <img
                src={process.env.REACT_APP_API_URL + post.imgs[0]}
                alt={post.imgs[0]}
              />
            </div>
            <div className={styles.card__username}>username</div>
          </div>
        )}

        <div className={styles.card__car_info}>
          {carLogo && (
            <div className={styles.card__car_logo}>
              <img src={carLogo} alt="Car logo" />
            </div>
          )}

          <div className={styles.card__car_make}>{post.carMake}</div>
          <div className={styles.card__car_model}>{post.carModel}</div>
        </div>

        {user?.id === post.user_id && (
          <div onClick={handleEditPost} className={styles.card__edit_icon}>
            <EditIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
