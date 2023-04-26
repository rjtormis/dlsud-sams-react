import { createContext, useEffect, useRef, useReducer, useContext, useState } from "react";
import axios from "axios";

// Hooks
import { useAuth } from "./AuthContext";

// Actions
import { fetchProfilewithCollegiates } from "../actions/Profile";

// Reducer
import ProfileReducer from "../reducers/ProfileReducer";
import { useParams } from "react-router-dom";
const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const params = useParams();
  const { auth, refetch, setRefetch } = useAuth();

  const [defaultID, setDefaultID] = useState(auth.id);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [profID, setProfID] = useState("");
  const [fileErrorMsg, setFileErrorMsg] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const initialValues = {
    profile: {},
    collegiates: [],
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialValues);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const set_profile = async (id, type) => {
      try {
        setLoading(true);
        const [profile_result, collegiate_result] = await fetchProfilewithCollegiates(
          auth,
          id,
          type
        );
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
    if (params.id) {
      set_profile(profID, "student");
      setOnEdit(false);
    } else {
      set_profile(auth.id, "professor");
    }
  }, [auth, params, profID]);

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
        profID,
        setProfID,
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
