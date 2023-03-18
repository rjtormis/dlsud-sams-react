import { createContext, useEffect, useRef, useReducer, useContext, useState } from "react";
import axios from "axios";

// Hooks
import { useAuth } from "./AuthContext";

// Actions
import { fetchProfilewithCollegiates } from "../actions/Profile";

// Reducer
import ProfileReducer from "../reducers/ProfileReducer";
const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [fileErrorMsg, setFileErrorMsg] = useState("");
  const [fileError, setFileError] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const initialValues = {
    profile: {},
    collegiates: [],
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialValues);

  const fileInputRef = useRef(null);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth !== null) {
      const set_profile = async () => {
        try {
          setLoading(true);
          const [profile_result, collegiate_result] = await fetchProfilewithCollegiates(auth);
          dispatch({
            type: "SET_PROFILE_&_COLLEGIATE",
            profile: profile_result.data.user,
            collegiates: collegiate_result.data.collegiates,
          });
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };
      set_profile();
    }
  }, [auth]);

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        dispatch,
        fileInputRef,
        loading,
        setLoading,
        imagePreview,
        setImagePreview,
        onEdit,
        setOnEdit,
        fileError,
        setFileError,
        fileErrorMsg,
        setFileErrorMsg,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  return useContext(ProfileContext);
}

export default ProfileContext;
