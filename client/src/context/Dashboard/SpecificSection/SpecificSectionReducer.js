const SpecificSectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_SECTION_NAME":
      return { ...state, sectionName: action.payload, loading: false };
    case "SET_SECTION":
      return { ...state, section: action.payload, loading: false };
    case "IS_ADVISER":
      return { ...state, isAdviser: action.payload, loading: false };
    case "GET_ALL_SUBJECTS":
      return { ...state, subjects: action.payload };

    default:
      return state;
  }
};

export default SpecificSectionReducer;
