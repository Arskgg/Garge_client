import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./ImageSlider.module.scss";
import React, { useEffect, useState, useContext, createContext } from "react";
import PropTypes from "prop-types";

const SliderContext = createContext();

const SlidesList = () => {
  const { slideNumber, images } = useContext(SliderContext);
  return (
    <div
      className={styles.slide_list}
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {images.map((image) => (
        <div key={image} className={styles.slide}>
          <img src={image} alt={"url"} className={styles.slide_image} />
        </div>
      ))}
    </div>
  );
};

const Image = ({ number, image }) => {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
      className={
        slideNumber === number
          ? styles.image__container_selected
          : styles.image__container
      }
      onClick={() => goToSlide(number)}
    >
      <img src={image} alt={image + ".jpg"} className="image" />
    </div>
  );
};

const ImagesGallery = () => {
  const { images } = useContext(SliderContext);

  const renderImages = () => {
    return images.map((image, i) => (
      <Image key={`image-${i}`} image={image} number={i} />
    ));
  };

  return <div className={styles.images}>{renderImages()}</div>;
};

const ImageSlider = ({ images, width, height, autoPlay, autoPlayTime }) => {
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = images.length - 1;
    } else {
      slideNumber = (slide + direction) % images.length;
    }

    setSlide(slideNumber);
  };

  const goToSlide = (number) => {
    setSlide(number % images.length);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length, slide]); // when images uploaded or slide changed manually we start timer

  return (
    <div className={styles.slider__wrapper} style={{ width, height }}>
      <SliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: images.length,
          slideNumber: slide,
          images,
        }}
      >
        <div
          className={styles.slider}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <SlidesList />

          {images.length > 1 && (
            <>
              <div
                className={styles.slider__left_arrow}
                onClick={() => changeSlide(-1)}
              >
                <ChevronLeftIcon />
              </div>
              <div
                className={styles.slider__right_arrow}
                onClick={() => changeSlide(1)}
              >
                <ChevronRightIcon />
              </div>
            </>
          )}
        </div>
        {images.length > 1 && <ImagesGallery />}
      </SliderContext.Provider>
    </div>
  );
};

ImageSlider.propTypes = {
  autoPlay: PropTypes.bool,
  autoPlayTime: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
};

ImageSlider.defaultProps = {
  autoPlay: false,
  autoPlayTime: 5,
  width: "100%",
  height: "100%",
};

export default ImageSlider;
