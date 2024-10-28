"use client"; // Використовуємо клієнтську частину
import css from "./standart.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md"; // Іконка для закриття меню
import { IoMdClose } from "react-icons/io";

const Navigations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Визначення ширини екрану
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960); // Мобільна версія при ширині <= 768px
    };

    handleResize(); // Виклик при першому рендері
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Відкриття/закриття меню
  };

  return (
    <>
      {isMobile ? (
        <div className={css.mobileMenu}>
          <button onClick={toggleMenu} className={css.hamburgerButton}>
            {isMenuOpen ? <MdClose size={30} /> : <RxHamburgerMenu size={30} />}
          </button>
          {isMenuOpen && (
            <div className={css.fullScreenMenu}>
              <IoMdClose className={css.ioMdClose} onClick={toggleMenu} />

              <ul className={css.mobileNav}>
                <li>
                  <Link href={`/`} className={css.link} onClick={toggleMenu}>
                    Головна
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/catalog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Продукція
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/works`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Наші роботи
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/blog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Блог
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/about`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/contact`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Контакти
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className={css.ulNavigation}>
          <li className={css.liNavigation}>
            <Link href={`/`} className={css.link}>
              Головна
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/catalog`} className={css.link}>
              Квартири
            </Link>
          </li>

          <li className={css.liNavigation}>
            <Link href={`/blog`} className={css.link}>
              Блог
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/about`} className={css.link}>
              Про нас
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/contact`} className={css.link}>
              Контакти
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navigations;
