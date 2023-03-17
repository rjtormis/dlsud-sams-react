const AuthReducers = (state, action) => {
  switch (action.type) {
    case "SET_LOADING_TRUE":
      return {
        ...state,
        loading: true,
      };
    case "SET_LOADING_FALSE":
      return {
        ...state,
        loading: false,
      };
    case "SET_UPDATE_PROFILE_TRUE":
      return { ...state, update_profile: true };
    case "SET_UPDATE_PROFILE_FALSE":
      return { ...state, update_profile: false };

    default:
      return state;
  }
};

export default AuthReducers;
