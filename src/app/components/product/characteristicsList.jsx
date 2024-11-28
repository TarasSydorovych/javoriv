import css from "./product.module.css"; // Імпортуйте свої стилі

export default function CharacteristicsList({ productData, t }) {
  return (
    <div className={css.haracteristicWrap}>
      <p className={css.haracterisvP}>Характеристики</p>
      <ul className={css.ulWrapOm}>
        {productData &&
          productData.characteristics.map((characteristic, index) => (
            <li
              key={characteristic._id}
              className={index % 2 === 0 ? css.evenItem : css.oddItem} // Чередування класів
            >
              {characteristic.title} {/* Виводьте потрібне значення тут */}
            </li>
          ))}
      </ul>
    </div>
  );
}
