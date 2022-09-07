import React from "react";
import styles from "./CarInfoCard.module.scss";
import TextPlaceholder from "./TextPlaceholder";

const CarInfoCard = ({ post }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__title}>Tech specs</div>
        <div className={styles.card__tech_specs}>
          <TextPlaceholder title="Make" description={post.carMake} />
          <TextPlaceholder title="Model" description={post.carModel} />
          <TextPlaceholder title="Type" description={post.type} />
          <TextPlaceholder title="Year" description={post.year} />
          <TextPlaceholder title="Horsepower" description={`${post.hp} HP`} />
          <TextPlaceholder
            title="Top Speed"
            description={`${post.topSpeed} MPH`}
          />
          <TextPlaceholder
            title="Acceleration (0-60 mph)"
            description={`${post.acceleration} sec`}
          />
          <TextPlaceholder
            title="Transmission"
            description={post.transmission}
          />
          <TextPlaceholder title="Engine" description={post.engine} />
        </div>
        <div className={styles.card__description_container}>
          <div className={styles.card__title_description}>Description</div>
          <div className={styles.card__description}>{post.description}</div>
        </div>
      </div>
    </div>
  );
};

export default CarInfoCard;

// carMake
// carModel
// type
// year
// hp
// topSpeed
// acceleration
// transmission
// engine
// description
// imgs
// tags
