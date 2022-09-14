import React from "react";
import FormUpdateCard from "../../components/FormUpdateCard";
import styles from "./PostUpdate.module.scss";

const PostUpdate = () => {
  return (
    <section className={styles.post_update}>
      <div className={styles.container}>
        <FormUpdateCard />
      </div>
    </section>
  );
};

export default PostUpdate;
