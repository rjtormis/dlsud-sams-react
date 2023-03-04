import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import useCookie from "../hooks/useCookie";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const refresh = useCookie("csrf_refresh_token");
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
    if (auth) {
      setUser(auth.name);
    }
  }, [auth]);

  useEffect(() => {
    if (auth && refresh) {
      const requestAccessToken = setInterval(async () => {
        try {
          const response = await axios.post("/refresh_token", null, {
            headers: { "X-CSRF-TOKEN": refresh },
          });
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      }, 1000 * 60 * 8);
      return () => clearInterval(requestAccessToken);
    }
  }, [auth, refresh]);

  const logout = () => {
    setAuth(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, user, setAuth, logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
