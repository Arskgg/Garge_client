import React from "react";
import PostCard from "../PostCard";
import styles from "./PostList.module.scss";

const PostList = ({ posts }) => {
  return (
    <div className={styles.post_list}>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className={styles.post_list_item}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
};

export default PostList;
