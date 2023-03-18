const ProfileReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE_&_COLLEGIATE":
      return { ...state, profile: action.profile, collegiates: action.collegiates };
    case "SET_UPLOAD_SUCCESS":
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
