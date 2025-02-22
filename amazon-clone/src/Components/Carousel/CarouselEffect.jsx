import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./Image/data";
import styles from "./Carousel.module.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => {
          return <img key={index} src={imageItemLink} />;
        })}
      </Carousel>
      <div className={styles.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
