import React from "react";
import styles from "./UserPostList.module.scss";
import PostCard from "../../../../components/PostCard";

const UserPostList = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} noUser />
      ))}
    </div>
  );
};

export default UserPostList;
