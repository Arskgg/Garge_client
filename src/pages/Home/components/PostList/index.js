import React from "react";
import PostCard from "../PostCard";
import styles from "./PostList.module.scss";
import { useNavigate } from "react-router-dom";
import { POST_DETAILS_ROUTE } from "../../../../utils/constants";

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
