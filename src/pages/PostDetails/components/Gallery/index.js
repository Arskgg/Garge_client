import React from "react";
import ImageSlider from "./components/ImageSlider";
import styles from "./Gallery.module.scss";

const Gallery = ({ images }) => {
  return (
    <section className={styles.gallery}>
      <div className={styles.image_slider_container}>
        <ImageSlider images={images} autoPlay />
      </div>
    </section>
  );
};

export default Gallery;
