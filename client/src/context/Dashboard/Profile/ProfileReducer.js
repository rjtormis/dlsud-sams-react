const ProfileReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING_TRUE":
      return { ...state, loading: true };
    case "SET_LOADING_FALSE":
      return { ...state, loading: false };
    case "SET_PROFILE_&_COLLEGIATE":
      return { ...state, profile: action.profile, collegiates: action.collegiates, loading: false };
    case "SET_IMAGE_PREVIEW":
      return { ...state, imagePreview: action.payload, loading: false };
    case "SET_IMAGEPREVIEW_&_EDIT":
      return { ...state, onEdit: action.edit, imagePreview: "", loading: false };
    case "SET_UPLOAD_SUCCESS":
      return {
        ...state,
        onEdit: action.edit,
        imagePreview: "",
        loading: false,
        profile: action.profile,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
