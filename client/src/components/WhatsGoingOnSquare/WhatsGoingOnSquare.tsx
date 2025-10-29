import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Image } from "@heroui/react";

interface WhatsGoingOnSquareTypes {
  title: string;
  desc: string;
  link: string;
  name: string;
  alt: string;
}

function WhatsGoingOnSquare({
  title,
  desc,
  link,
  name,
  alt,
}: WhatsGoingOnSquareTypes) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [textHeight, setTextHeight] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setTextHeight(0);
  };

  const handleMouseLeave = () => {
    if (!textRef.current) return;
    setTextHeight(textRef.current.clientHeight + 9);
  };

  useEffect(() => {
    if (!textRef.current || !isLoaded) return;
    setTextHeight(textRef.current.clientHeight + 9);
  }, [isLoaded]);

  return (
    <figure
      className="relative mx-auto mb-4 max-w-[600px] overflow-clip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={link}>
        <Image
          src={`/api/static/imgs/${name}/${name}-696.webp`}
          alt={alt}
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
        />
        <div
          className="text-shadow absolute left-1/2 z-15 w-full -translate-x-1/2 text-center text-white transition-all"
          // due to section element on index route having grid and figure not having defined height, the calcluated text height will be pushed down to bottom of screen. I let the browswer position based off normal positioning (e.g. 0) first and once image is loaded with height we can safely calculate text height
          style={{ bottom: isLoaded ? `-${textHeight}px` : "0px" }}
        >
          <h3 className="sub-header">{title}</h3>
          <p className="general-text block w-full text-center" ref={textRef}>
            {desc}
          </p>
        </div>
      </Link>
    </figure>
  );
}

export default WhatsGoingOnSquare;
