import React, { createContext, useContext, useEffect, useState } from "react";

type WindowDimensions = {
  width: number;
  height: number;
};

export const WindowDimensionsContext = createContext<WindowDimensions | null>(null);

export const WindowDimensionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowDimensionsContext.Provider value={dimensions}>
      {children}
    </WindowDimensionsContext.Provider>
  );
};
