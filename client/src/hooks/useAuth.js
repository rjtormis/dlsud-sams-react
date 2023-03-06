import { useContext } from "react";
import AuthContext from "../context/Authentication/AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
