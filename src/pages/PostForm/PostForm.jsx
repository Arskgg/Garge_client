import React from "react";
import FormCreateCard from "../../components/FormCreateCard";
import styles from "./PostForm.module.scss";

const PostForm = () => {
  return (
    <section className={styles.post_form}>
      <div className={styles.container}>
        <FormCreateCard />
      </div>
    </section>
  );
};

export default PostForm;
