import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import styles from "./CommentCard.module.scss";
import UserImg from "../../../../../../components/UserImg";
import { useNavigate } from "react-router-dom";

const CommentCard = ({ commentData }) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const handleUserProfile = () => {
    navigate(`/user/${commentData.user_id._id}`);
  };

  return (
    <div className={styles.comment_card}>
      <div className={styles.comment_card__container}>
        <div className={styles.comment_card__user}>
          <div
            className={styles.comment_card__user_img}
            onClick={handleUserProfile}
          >
            {commentData?.user_id?.img ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/${commentData.user_id.img}`}
                alt="User"
              />
            ) : (
              <UserImg username={commentData.user_id.username} />
            )}
          </div>
          <div
            className={styles.comment_card__username}
            onClick={handleUserProfile}
          >
            {commentData.user_id.username}
          </div>
        </div>

        <div className={styles.comment_card__comment}>
          {commentData.comment}
        </div>

        <div className={styles.comment_card__info}>
          <div className={styles.comment_card__likes}>
            <div className={styles.comment_card__likes_icon}>
              {like ? (
                <FavoriteIcon
                  onClick={() => setLike((prev) => !prev)}
                  style={{ color: "var(--primary-color)" }}
                />
              ) : (
                <FavoriteBorderIcon onClick={() => setLike((prev) => !prev)} />
              )}
            </div>

            <div className={styles.comment_card__likes_number}>
              {like ? 1 : 0}
              {/* {commentData.likes.length} */}
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
