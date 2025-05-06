import { useContext } from "react";
import { WindowDimensionsContext } from "../context/WindowDimensionsContext";

export const useWindowDimensions = () => {
  const context = useContext(WindowDimensionsContext);
  if (!context) {
    throw new Error(
      "useWindowDimensions must be used in WindowDimensinosProvider"
    );
  }
  return context;
};
