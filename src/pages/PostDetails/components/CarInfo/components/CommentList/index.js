import { useParams } from "react-router-dom";
import { useGetCommentsByPostIdQuery } from "../../../../../../services/commentApiSlice";
import CommentCard from "./CommentCard";
import styles from "./CommentList.module.scss";
const CommentList = () => {
  const { id } = useParams();
  const { data: comments, isLoading } = useGetCommentsByPostIdQuery(id);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.comments}>
      <div className={styles.comments__title}>Comments</div>

      <div className={styles.comments__list}>
        {comments.map((comment) => (
          <CommentCard key={comment.id} commentData={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
