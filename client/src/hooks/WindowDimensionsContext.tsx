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
    width: window.innerHeight,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowDimensionsContext.Provider value={dimensions}>
      {children}
    </WindowDimensionsContext.Provider>
  );
};
