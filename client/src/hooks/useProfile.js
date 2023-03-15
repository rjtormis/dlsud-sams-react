import { useContext } from "react";
import ProfileContext from "../context/Dashboard/Profile/ProfileContext";
function useProfile() {
  return useContext(ProfileContext);
}

export default useProfile;
