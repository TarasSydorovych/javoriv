import css from "./contact.module.css";
const Map = () => {
  return (
    <div className={css.wrpaMap}>
      <p className={css.mapPin}>Відділ продажу</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.7161418026933!2d23.572228315673292!3d49.931770379402746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473b3d67981af771%3A0xeec53ee29a5e84fa!2z0LLRg9C70LjRhtGPINCc0LjQsdCw0LfQsNC70LAg0YLRg9GC0L7QutC40L3QsCwgMTEsINCd0YDQtdC80LXQvdGC0LUg0LLRgdC40LzQsCwgODEwNTQ!5e0!3m2!1suk!2sua!4v1698140912345!5m2!1suk!2sua"
        width="80%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <p className={css.mapPin}>Розташування ЖК ЯнівБуд</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2568.046321536929!2d23.566334093839206!3d49.93547209800967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473b3d68b837bd47%3A0x7d6673d2d60a1761!2z0LLRg9C70LjRhtGPINCS0LXRgNCx0LjRhtGM0LrQvtCz0L4sIDgsINCd0L7QstC-0Y_QstC-0YDRltCy0YHRjNC6LCDQm9GM0LLRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDgxMDU0!5e0!3m2!1sru!2sua!4v1729857883516!5m2!1sru!2sua"
        width="80%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
export default Map;
