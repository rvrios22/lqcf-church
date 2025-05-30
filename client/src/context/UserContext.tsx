import React, { createContext, useEffect, useState } from "react";
import { getUserFromToken, User } from "../utils/auth";

export interface UserContextTypes {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextTypes | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = getUserFromToken();
    setUser(loggedInUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
