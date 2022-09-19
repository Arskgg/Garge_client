import React from "react";
import CarInfoCard from "./components/CarInfoCard/indexs";
import CarInfoComments from "./components/CommentList";
import styles from "./CarInfo.module.scss";
import AddCommentCard from "./components/AddCommentCard";
import CommentList from "./components/CommentList";
import Footer from "../../../../components/Footer";

function CarInfo({ post }) {
  return (
    <section className={styles.car_info}>
      <div className={styles.car_info__container}>
        <div className={styles.car_info__tech_specs}>
          <CarInfoCard post={post} />
          <AddCommentCard />
        </div>

        <div className={styles.car_info__comments}>
          <CommentList />
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default CarInfo;
