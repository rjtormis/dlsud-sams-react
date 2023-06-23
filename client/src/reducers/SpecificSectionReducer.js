const SpecificSectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_ENROLLED":
      return { ...state, subject: action.payload };
    case "SET_SECTION":
      return { ...state, section: action.payload };
    case "SET_SUBJECT":
      return { ...state, subject: action.payload };
    case "SET_EDIT_SUBJECT":
      return { ...state, editSubject: action.payload };
    case "UPDATE_ENROLLED":
      return { ...state, subject: { ...state, enrolled: action.payload } };
    case "CLEAR_SECTION":
      return { ...state, section: {} };
    case "CLEAR_EDIT_SUBJECT":
      return { ...state, editSubject: {} };
    case "CLEAR_SUBJECT":
      return { ...state, subject: {} };
    case "CLEAR_ENROLLED":
      return { ...state, enrolled: {} };

    default:
      return state;
  }
};

export default SpecificSectionReducer;
