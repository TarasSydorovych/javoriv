import Link from "next/link";
import css from "../catalog/catalog.module.css";
import { IoArrowForwardOutline } from "react-icons/io5";

import Image from "next/image";
const OneProductWrap = ({ product, lng }) => {
  return (
    <div className={css.wrapOneProducts}>
      {product && (
        <div className={css.imageWrapper}>
          <Image
            src={product.photos[0]} // Шлях до зображення або дефолтне зображення
            alt={product.title}
            className={css.productImage}
            layout="responsive" // Використовуємо responsive для адаптивності
            width={400} // Встановлюємо ширину зображення
            height={400} // Встановлюємо висоту зображення
          />
        </div>
      )}
      <Link className={css.linKInSmallPro} href={`/blog/${product._id}`}>
        <div className={css.wrapNameProdWithArrow}>
          <p className={css.pInNameProductnew}>{product.title}</p>
          <IoArrowForwardOutline className={css.newwardOutline} />
        </div>
      </Link>
    </div>
  );
};
export default OneProductWrap;
