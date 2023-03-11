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
    case "SET_SUBJECT_NAME":
      return { ...state, subjectName: action.payload, loading: false };
    case "SET_SUBJECT":
      return { ...state, subject: action.payload, loading: false };
    case "CLEAR_SUBJECT":
      return { ...state, subject: {}, loading: false };

    default:
      return state;
  }
};

export default SpecificSectionReducer;
