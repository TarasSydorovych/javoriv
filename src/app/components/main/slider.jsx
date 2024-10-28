"use client";
import { useState, useEffect } from "react";
import css from "./main.module.css";
import vizualJan from "../../img/vizualJan.jpg";
import vizualJan2 from "../../img/vizualJan2.jpg";
import vizualJan3 from "../../img/vizualJan3.jpg";
import vizualJan4 from "../../img/vizualJan4.jpg";
import vizualJan5 from "../../img/vizualJan5.jpg";
import vizualJan6 from "../../img/vizualJan6.jpg";

const Slider = () => {
  const images = [
    vizualJan,
    vizualJan2,
    vizualJan3,
    vizualJan4,
    vizualJan5,
    vizualJan6,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Змінює слайд кожні 2 секунди

    return () => clearInterval(slideInterval);
  }, [images.length]);

  return (
    <div className={css.slider}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          className={`${css.slide} ${css.imageSlide} ${
            index === currentSlide ? css.active : ""
          }`}
          alt={`Slide ${index + 1}`}
        />
      ))}
      <div className={css.overlay}></div>
    </div>
  );
};

export default Slider;
