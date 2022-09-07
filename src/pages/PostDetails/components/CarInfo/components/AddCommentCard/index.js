import { useState } from "react";
import Button from "../../../../../../components/Button";
import Input from "../../../../../../components/Input";
import styles from "./AddCommentCard.module.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../../store/authSlice";
import { useCommentPostMutation } from "../../../../../../services/commentApiSlice";
import { useParams } from "react-router-dom";

const AddCommentCard = () => {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  const [comment, setComment] = useState("");
  const [commentPost] = useCommentPostMutation();

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const sendComment = async () => {
    if (comment?.trim().length > 0) {
      const commentData = {
        user_id: user.id,
        comment: comment.trim(),
      };

      try {
        await commentPost({ postId: id, commentData }).unwrap();
        setComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.comment_card}>
      <Input
        name="comment"
        label="Comment"
        handleChange={handleInputChange}
        placeHolder="Leave a comment..."
        multiline
        value={comment}
        minRows={4}
      />
      <Button onClick={sendComment}>Comment</Button>
    </div>
  );
};

export default AddCommentCard;
