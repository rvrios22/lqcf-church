import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import styles from "./Footer.module.css";
function Footer() {
  const { height } = useWindowDimensions();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerChild}>
        {" "}
        <h3 className="sub-header">Service Times:</h3>
        <p className="general-text">Sunday Bible Study: 9:00AM</p>
        <p className="general-text">Sunday Service: 10:00AM</p>
        <p className="general-text">Wednesday Service: 6:30PM</p>
      </div>
      <div className={styles.footerChild}>
        <h3 className="sub-header">Church Address:</h3>
        <p className="general-text">
          50800 Calle Paloma<br></br>La Quinta CA 92253
        </p>
        <h3 className="sub-header">Mailing Address:</h3>
        <p className="general-text">P.O. Box 676 La Quinta CA 92247</p>
        <h3 className="sub-header">Contact Us:</h3>
        <p className="general-text">
          <a href="tel:760-564-9195">760-564-9195</a>
        </p>
        <p className="general-text">
          <a href="mailto:lqcf@verizon.net">lqcf@verizon.net</a>
        </p>
      </div>
      <div className={styles.footerChild}>
        <img
          className="img-cover"
          loading="lazy"
          src="/api/static/imgs/churchMap.webp"
          alt="A location of the church"
          height={height * 0.33}
        />
      </div>
    </footer>
  );
}

export default Footer;
