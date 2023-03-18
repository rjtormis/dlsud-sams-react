import { createContext, useEffect, useState, useContext } from "react";

// Actions
import { generateNewAccessToken } from "../actions/Auth";

// Utilities
import { getCookie } from "../utilities/getCookie";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const refresh = getCookie("csrf_refresh_token");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    if (auth && refresh) {
      const requestAccessToken = setInterval(async () => {
        await generateNewAccessToken(refresh);
      }, 1000 * 60 * 2);
      return () => clearInterval(requestAccessToken);
    }
  }, [auth, refresh]);

  const logout = () => {
    setAuth(null);
    setUpdated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, loading, setLoading, updated, setUpdated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
