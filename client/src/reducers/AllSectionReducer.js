const AllSectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "NEW_SECTION":
      return { ...state, newSection: true, loading: false };
    case "GET_ALL_SECTIONS":
      return { ...state, sections: action.payload, loading: false };
    default:
      return state;
  }
};

export default AllSectionReducer;
