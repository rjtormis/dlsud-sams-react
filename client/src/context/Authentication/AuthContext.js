import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import useCookie, { getCookie } from "../../utilities/getCookie";

// Reducers
import AuthReducers from "./AuthReducers";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = {
    loading: false,
  };
  const access = getCookie("csrf_access_token");
  const refresh = getCookie("csrf_refresh_token");
  const [state, dispatch] = useReducer(AuthReducers, initialState);
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    if (auth && refresh) {
      const requestAccessToken = setInterval(async () => {
        try {
          const response = await axios.post("/refresh_token", null, {
            headers: { "X-CSRF-TOKEN": refresh },
          });
          console.log(response);
          console.log(auth);
        } catch (e) {
          console.log(e);
        }
      }, 1000 * 60 * 2);
      return () => clearInterval(requestAccessToken);
    }
  }, [auth, refresh]);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
