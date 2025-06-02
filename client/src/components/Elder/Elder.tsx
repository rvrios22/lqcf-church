import styles from "./Elder.module.css";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

interface ElderTypes {
  name: string;
  bio: string;
  img: string;
}
function Elder({ name, bio, img }: ElderTypes) {
  const { width, initialHeightRef } = useWindowDimensions();
  return (
    <figure className={styles.figure}>
      <div>
        <img
          src={`api/static/imgs/${img}`}
          alt={name}
          className={`img-cover ${styles.img}`}
          width={width * 0.9}
          height={initialHeightRef.current * 0.75}
          loading="lazy"
        />
        <h2 className="sub-header">{name}</h2>
      </div>
      <div>
        <p
          style={{
            maxHeight: width > 699 ? initialHeightRef.current * 0.75 : "auto",
            overflow: "scroll",
          }}
          className="general-text"
        >
          {bio}
        </p>
      </div>
    </figure>
  );
}

export default Elder;
