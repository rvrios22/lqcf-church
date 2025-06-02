import { useState } from "react";
import styles from "./HeroImg.module.css";

interface HeroImgTypes {
  width: number;
  height: number;
  img: string;
  text: string;
}

function HeroImg({ width, height, img, text }: HeroImgTypes) {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        onLoad={() => setLoaded(true)}
        src={`api/static/imgs/${img}`}
        alt={img}
        width={width}
        height={height}
      />
      <h1 className={`${styles.text} ${!loaded ? "" : styles.slide}`}>
        {text}
      </h1>
    </div>
  );
}

export default HeroImg;
