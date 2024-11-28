import css from "./product.module.css";
import { SiAdguard } from "react-icons/si";
import { IoBuild } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";

import ButtonBye from "./buttonBye";

const SecondBlockMain = ({ productData, lng, t }) => {
  return (
    <div className={css.wrapBlockMainTitle}>
      <h1 className={css.nameProduct}>{productData.name}</h1>
      <p className={css.smalDescriptions}>{productData.shortDescription}</p>
      {/* <div className={css.likeGuarantyWrap}>
        <div className={css.wrapOneGuard}>
          <SiAdguard className={css.iconGuard} />
          <p className={css.quardPin}></p>
        </div>
        <div className={css.wrapOneGuard}>
          <IoBuild className={css.iconGuard} />

          <p className={css.quardPin}></p>
        </div>
        <div className={css.wrapOneGuard}>
          <MdOutlineMiscellaneousServices className={css.iconGuard} />

          <p className={css.quardPin}></p>
        </div>
      </div> */}
      <div className={css.twoButtonsWrap}>
        <ButtonBye />
      </div>
    </div>
  );
};
export default SecondBlockMain;
