import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import styles from "./CommentCard.module.scss";
import img from "../../../../../../assets/barnd/garage-logo.png";

const CommentCard = ({ commentData }) => {
  return (
    <div className={styles.comment_card}>
      <div className={styles.comment_card__container}>
        <div className={styles.comment_card__user}>
          <div className={styles.comment_card__user_img}>
            <img src={img} alt="user" />
          </div>
          <div className={styles.comment_card__username}>
            {commentData.username}
          </div>
        </div>

        <div className={styles.comment_card__comment}>
          {commentData.comment}
        </div>

        <div className={styles.comment_card__info}>
          <div className={styles.comment_card__likes}>
            <div className={styles.comment_card__likes_icon}>
              <FavoriteBorderIcon />
            </div>

            <div className={styles.comment_card__likes_number}>
              {commentData.likes.length}
            </div>
          </div>

          <div className={styles.comment_card__date}>
            {moment(commentData.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
