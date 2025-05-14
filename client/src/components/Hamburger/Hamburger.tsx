import styles from "./Hamburger.module.css";
interface HamburgerTypes {
  hamburger: React.RefObject<HTMLInputElement | null>;
  setIsMenuShowing: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuShowing: boolean;
}
function Hamburger({ hamburger, setIsMenuShowing, isMenuShowing }: HamburgerTypes) {
  return (
    <label className={styles.hamburger}>
      <input
        type="checkbox"
        ref={hamburger}
        onClick={() => setIsMenuShowing(!isMenuShowing)}
      />
      <svg viewBox="0 0 32 32">
        <path
          className={`${styles.line} ${styles.lineTopBottom}`}
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        ></path>
        <path className={styles.line} d="M7 16 27 16"></path>
      </svg>
    </label>
  );
}

export default Hamburger;
