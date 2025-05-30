import { useContext } from "react";
import { UserContext, UserContextTypes } from "../context/UserContext";

export const useUser = (): UserContextTypes => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
