import styles from "./UserPostList.module.scss";
import PostCard from "../../../../components/PostCard";
import { motion } from "framer-motion";

const UserPostList = ({ posts }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: "200px" }}
      animate={{ opacity: 1, y: "0" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {posts.map((post, i) => (
        <div key={post._id}>
          <PostCard post={post} noUser />
        </div>
      ))}
    </motion.div>
  );
};

export default UserPostList;
