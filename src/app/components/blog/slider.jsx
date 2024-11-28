"use client"; // Клієнтський рендеринг

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css"; // Стилі для PhotoView
import styles from "./works.module.css";

// Динамічний імпорт слайдера з вимкненим SSR
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function WorkSlider({ photos }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className={styles.photosSlider}>
      <PhotoProvider>
        <Slider {...sliderSettings}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.wrapOneRd}>
              <PhotoView src={photo}>
                <img
                  src={photo}
                  alt={`Фотографія ${index + 1}`}
                  className={styles.workImage}
                />
              </PhotoView>
            </div>
          ))}
        </Slider>
      </PhotoProvider>
    </div>
  );
}

// Кастомні стрілки для слайдера
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow} ${styles.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow} ${styles.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}
