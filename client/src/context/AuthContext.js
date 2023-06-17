import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

// Actions
import { generateNewAccessToken } from "../actions/Auth";

// Utilities
import { getCookie } from "../utilities/getCookie";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [prevLoc, setPrevLoc] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  // const refresh = getCookie("csrf_refresh_token");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    if (auth && auth.refresh_token) {
      const requestAccessToken = setInterval(async () => {
        await generateNewAccessToken(auth.refresh_token);
      }, 1000 * 60 * 2);
      return () => clearInterval(requestAccessToken);
    }
  }, [auth]);

  const logout = () => {
    setAuth(null);
    setUpdated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logout,
        loading,
        setLoading,
        updated,
        setUpdated,
        refetch,
        setRefetch,
        prevLoc,
        setPrevLoc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
