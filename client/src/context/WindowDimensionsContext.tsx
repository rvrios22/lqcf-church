import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

type WindowDimensions = {
  width: number;
  height: number;
  initialWidthRef: React.RefObject<number>;
  initialHeightRef: React.RefObject<number>;
};

export const WindowDimensionsContext = createContext<WindowDimensions | null>(
  null
);

export const WindowDimensionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const initialWidthRef = useRef<number>(0);
  const initialHeightRef = useRef<number>(0);
  const hasSetInitial = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      setDimensions({
        width: currentWidth,
        height: currentHeight,
      });
      if (!hasSetInitial.current) {
        initialWidthRef.current = currentWidth;
        initialHeightRef.current = currentHeight;
        hasSetInitial.current = true;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contextValue = useMemo(
    () => ({
      ...dimensions,
      initialHeightRef,
      initialWidthRef,
    }),
    [dimensions]
  );

  return (
    <WindowDimensionsContext.Provider value={contextValue}>
      {children}
    </WindowDimensionsContext.Provider>
  );
};
