import { createContext, useEffect, useRef, useReducer } from "react";
import axios from "axios";

// Hooks
import useAuth from "../../../hooks/useAuth";

// Reducer
import ProfileReducer from "./ProfileReducer";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const initialValues = {
    profile: {},
    loading: false,
    collegiates: [],
    imagePreview: "",
    onEdit: false,
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialValues);

  const fileInputRef = useRef(null);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth !== null) {
      const test = async () => {
        try {
          dispatch({ type: "SET_LOADING_TRUE" });
          const profile = await axios.get(`/api/v1/profiles/${auth.id}`, {
            headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
          });
          const collegiate = await axios.get(`/api/v1/collegiates`, {
            headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
          });
          const [profile_result, collegiate_result] = await Promise.all([profile, collegiate]);
          dispatch({
            type: "SET_PROFILE_&_COLLEGIATE",
            profile: profile_result.data.user,
            collegiates: collegiate_result.data.collegiates,
          });
        } catch (e) {
          console.log(e);
          dispatch({ type: "SET_LOADING_FALSE" });
        }
      };
      test();
    }
  }, [auth]);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch, fileInputRef }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
