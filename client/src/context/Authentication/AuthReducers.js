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
    default:
      return state;
  }
};

export default AuthReducers;
