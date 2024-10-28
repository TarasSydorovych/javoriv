import css from "./contact.module.css";
import LocalInform from "./localInform";
import SendForm from "./sendForm";
const BlockWithForm = () => {
  return (
    <div className={css.blockWithFormWrap}>
      <SendForm />
      <LocalInform />
    </div>
  );
};
export default BlockWithForm;
