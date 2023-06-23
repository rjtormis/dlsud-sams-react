import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [trigger, setTrigger] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {}, [trigger]);

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
        trigger,
        setTrigger,
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
