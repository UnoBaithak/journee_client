"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SessionContextType = {
  isLoggedIn: boolean,
  username: string
};

const SessionContext = createContext<SessionContextType>({
  isLoggedIn : false,
  username: ""
});

export const useSession = () => useContext(SessionContext);

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/session`)
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setUsername(data.username);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  }, []);

  return (
    <SessionContext.Provider value={{ isLoggedIn, username }}>
      {children}
    </SessionContext.Provider>
  );
};