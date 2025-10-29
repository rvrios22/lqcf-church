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

  const handleMouseEnter = () => {
    setTextHeight(0);
  };

  const handleMouseLeave = () => {
    if (!textRef.current) return;
    setTextHeight(textRef.current.clientHeight + 9);
  };

  useEffect(() => {
    if (!textRef.current) return;
    setTextHeight(textRef.current.clientHeight + 9);
  }, []);

  return (
    <figure className="relative mx-auto mb-4 ">
      <Image
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        src={`/api/static/imgs/${name}/${name}-696.webp`}
        alt={alt}
        className="object-cover"
      />
      <div
        className="text-shadow absolute left-0 z-15 mx-auto text-center text-white transition-all"
        style={{ bottom: `-${textHeight}px` }}
      >
        <h3 className="sub-header">{title}</h3>
        <p className="general-text border-1 border-red-500 w-full block text-center" ref={textRef}>
          {desc}
        </p>
      </div>
    </figure>
  );
}

export default WhatsGoingOnSquare;
