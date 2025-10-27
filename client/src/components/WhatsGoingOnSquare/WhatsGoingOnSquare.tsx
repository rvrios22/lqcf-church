import { Link } from "@tanstack/react-router";
import styles from "./WhatsGoingOnSquare.module.css";
import { useEffect, useRef, useState } from "react";

interface WhatsGoingOnSquareTypes {
  title: string;
  desc: string;
  link: string;
  src: string;
  height: number;
  width: number;
}

function WhatsGoingOnSquare({
  title,
  desc,
  link,
  src,
  height,
  width,
}: WhatsGoingOnSquareTypes) {
  const text = useRef<HTMLHeadingElement>(null);
  const [textContainerStyle, setTextContainerStyle] = useState({});
  const content = (
    <div className={styles.container}>
      <img
        loading="lazy"
        src={src}
        alt={title}
        // height={width > 699 ? height * 0.33 : height * 0.25}
        className={`img-cover ${styles.img}`}
      />
      <div style={textContainerStyle} className={styles.textContainer}>
        <h2 className="sub-header">{title}</h2>
        <p ref={text} className="general-text">
          {desc}
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    if (!text) return;
    const getHeightDifference = () => {
      const textAndMarginHeight = text.current!.clientHeight + 9;
      setTextContainerStyle({
        transform: `translate(0, ${textAndMarginHeight}px)`,
      });
    };
    getHeightDifference();
    window.addEventListener("resize", getHeightDifference);
    return () => window.removeEventListener("resize", getHeightDifference);
  }, []);

  const handleMouseEnter = () => {
    setTextContainerStyle({
      transform: `translate(0, 0)`,
      transition: "transform 100ms",
    });
  };

  const handleMouseExit = () => {
    if (!text) return;
    const textAndMarginHeight = text.current!.clientHeight + 9;
    setTextContainerStyle({
      transform: `translate(0, ${textAndMarginHeight}px)`,
      transition: "transform 200ms",
    });
  };

  return (
    <figure className={styles.figure} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      {link.startsWith("/") ? (
        <Link to={link}>{content}</Link>
      ) : (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )}
    </figure>
  );
}

export default WhatsGoingOnSquare;
