import { useEffect, useState } from "react";

interface WindowImgSize {
  height: number | null;
  width: number | null;
}

const useImgSizeFromWindow = (
  widthDivisor: number = 1,
  heightDivisor: number = 1
) => {
  const [imgSize, setImgSize] = useState<WindowImgSize>({
    height: null,
    width: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setImgSize({
        height: window.innerHeight / heightDivisor,
        width: window.innerWidth / widthDivisor,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    window.removeEventListener("resize", handleResize);
  }, []);
  return imgSize;
};

export default useImgSizeFromWindow;
