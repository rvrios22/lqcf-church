import { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import styles from "./MobileNavbar.module.css";
import Hamburger from "../Hamburger/Hamburger";

function MobileNavbar() {
  const [isMenuShowing, setIsMenuShowing] = useState<boolean>(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<string | null>(null);
  const hamburger = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const handleOnClick = (menu: string) => {
    setIsSubMenuOpen((prev) => (prev === menu ? null : menu));
  };
  console.log(isSubMenuOpen);
  useEffect(() => {
    const unsubscribe = router.history.subscribe(() => setIsMenuShowing(false));
    return () => unsubscribe();
  }, [router]);
  return (
    <nav>
      <Hamburger
        hamburger={hamburger}
        setIsMenuShowing={setIsMenuShowing}
        isMenuShowing={isMenuShowing}
      />
      <ul
        className={
          isMenuShowing
            ? `${styles.menu} ${styles.menuShowing} general-text`
            : `${styles.menu} general-text`
        }
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <div
            className={styles.subMenu}
            onClick={() => handleOnClick("ministry")}
          >
            <span>
              Ministry
              <img
                src="./arrow.svg"
                alt="arrow"
                height={24}
                className={isSubMenuOpen === "ministry" ? `${styles.open}` : ""}
              />
            </span>
          </div>
          <ul>
            <li>
              <Link to="/identity-youth">Identity Youth</Link>
            </li>
            <li>
              <Link to="/mens-study">Men's Study</Link>
            </li>
            <li>
              <Link to="/womens-study">Women's Study</Link>
            </li>
            <li>
              <Link to="/prayer-chain">Prayer Chain</Link>
            </li>
          </ul>
        </li>
        <li>
          <div className={styles.subMenu} onClick={() => handleOnClick("who")}>
            <span>
              Who We Are
              <img
                src="./arrow.svg"
                alt="arrow"
                height={24}
                className={isSubMenuOpen === "who" ? `${styles.open}` : ""}
              />
            </span>
          </div>
          <ul>
            <li>
              <Link to="/elders">Our Elders</Link>
            </li>
            <li>
              <Link to="/beliefs">What We Believe</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/school">School</Link>
        </li>
        <li>
          <Link to="/giving">Giving</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/prayer">Prayer</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MobileNavbar;
