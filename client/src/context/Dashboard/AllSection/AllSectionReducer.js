const AllSectionReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_SECTIONS":
      return { ...state, sections: action.payload, loading: false };
    default:
      return state;
  }
};

export default AllSectionReducer;
