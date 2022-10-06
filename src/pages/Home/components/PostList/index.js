import PostCard from "../../../../components/PostCard";
import styles from "./PostList.module.scss";
import { motion } from "framer-motion";

const PostList = ({ posts }) => {
  return (
    <motion.div
      className={styles.post_list}
      initial={{ opacity: 0, x: "200px" }}
      animate={{ opacity: 1, x: "0" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {posts &&
        posts.map((post, i) => (
          <div key={post._id} className={styles.post_list_item}>
            <PostCard post={post} />
          </div>
        ))}
    </motion.div>
  );
};

export default PostList;
