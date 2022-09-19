import React from "react";
import styles from "./CarInfoCard.module.scss";
import TextPlaceholder from "./TextPlaceholder";

const CarInfoCard = ({ post }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__title}>Tech specs</div>
        <div className={styles.card__tech_specs}>
          {post.carMake && (
            <TextPlaceholder title="Make" description={post.carMake} />
          )}
          {post.carModel && (
            <TextPlaceholder title="Model" description={post.carModel} />
          )}
          {post.type && (
            <TextPlaceholder title="Type" description={post.type} />
          )}
          {post.year && (
            <TextPlaceholder title="Year" description={post.year} />
          )}
          {post.hp && (
            <TextPlaceholder title="Horsepower" description={`${post.hp} HP`} />
          )}
          {post.topSpeed && (
            <TextPlaceholder
              title="Top Speed"
              description={`${post.topSpeed} MPH`}
            />
          )}
          {post.acceleration && (
            <TextPlaceholder
              title="Acceleration (0-60 mph)"
              description={`${post.acceleration} sec`}
            />
          )}
          {post.transmission && (
            <TextPlaceholder
              title="Transmission"
              description={post.transmission}
            />
          )}
          {post.engine && (
            <TextPlaceholder title="Engine" description={post.engine} />
          )}
        </div>
        {post.description && (
          <div className={styles.card__description_container}>
            <div className={styles.card__title_description}>Description</div>
            <div className={styles.card__description}>{post.description}</div>
          </div>
        )}
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
