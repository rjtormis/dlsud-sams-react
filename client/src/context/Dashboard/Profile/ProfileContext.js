import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [collegiates, setCollegiate] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth !== null) {
      const test = async () => {
        try {
          const profile = await axios.get(`/api/v1/profiles/${auth.id}`, {
            headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
          });
          const collegiate = await axios.get(`/api/v1/collegiates`, {
            headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
          });
          const [profile_result, collegiate_result] = await Promise.all([profile, collegiate]);
          setProfile(profile_result.data.user);
          setCollegiate(collegiate_result.data.collegiates);
        } catch (e) {
          console.log(e);
        }
      };
      test();
    }
  }, [auth]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, collegiates }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
