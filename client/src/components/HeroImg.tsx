import { useState } from "react";

interface HeroImgTypes {
  name: string;
  text: string;
}

function HeroImg({ name, text }: HeroImgTypes) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className="relative mx-auto my-6 flex w-4/5 justify-center overflow-clip rounded-2xl shadow-md">
      <img
        srcSet={`
    /api/static/imgs/${name}/${name}-300.webp 300w,
    /api/static/imgs/${name}/${name}-600.webp 600w,
    /api/static/imgs/${name}/${name}-1000.webp 1000w,
    /api/static/imgs/${name}/${name}-1500.webp 1500w,
    /api/static/imgs/${name}/${name}-2000.webp 2000w
  `}
        sizes="
    (min-width: 2560px) 80vw,
    (min-width: 1440px) 80vw,
    (min-width: 1024px) 80vw,
    (min-width: 768px) 80vw,
    (max-width: 320px) 80vw,
    80vw
  "
        className="m-auto h-[350px] object-cover lg:h-auto"
        src={`api/static/imgs/${name}/${name}-1000.webp`}
        alt={`${name} header`}
        onLoad={() => setLoaded(true)}
      />
      <h1
        className={`absolute left-1/2 z-11 -translate-x-1/2 -translate-y-1/2 text-center font-[Inter,'Tahoma','Verdana',sans-serif] text-xl text-white transition-all duration-1000 ease-in-out [text-shadow:3px_2px_3px_rgb(0,0,0)] md:text-2xl lg:text-5xl ${loaded ? "top-1/2 opacity-100" : "top-[60%] opacity-0"} `}
      >
        {text}
      </h1>
    </div>
  );
}

export default HeroImg;
