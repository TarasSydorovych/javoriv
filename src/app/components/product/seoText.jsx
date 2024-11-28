import css from "./product.module.css";

const SeoText = ({ productData, lng }) => {
  const longDescHTML = productData.longDescription;

  return (
    <div className={css.wrapSeoText}>
      <div
        className={css.seoTextp}
        dangerouslySetInnerHTML={{
          __html: longDescHTML, // HTML вже оброблений на сервері
        }}
      />
    </div>
  );
};
export default SeoText;
