import SpecificSectionItem from "./SpecificSectionItem";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useAuth } from "../../../context/AuthContext";

function SpecificSectionList() {
  const { auth } = useAuth();
  const { section, dispatch, setSubjectName } = useSpecificSection();
  const subjects = section.subjects;

  return (
    <>
      <div id="subject-container" className="flex-1 mt-2 rounded-t-lg">
        <div className="bg-green-800 p-2 rounded-t-lg">
          <button className=" btn btn-sm text-black mr-4">ALL</button>
          <button className="text-white">HANDLED</button>
        </div>
        <div className="grid grid-cols-4 p-2 gap-4">
          {subjects === undefined
            ? null
            : subjects.map((subject) => (
                <SpecificSectionItem
                  key={subject.id}
                  name={subject.subject_name}
                  professor={subject.handled_by}
                  schedule={subject.schedule}
                  isProfessor={auth.id === subject.handler_id}
                  onVisit={() => dispatch({ type: "SET_SUBJECT", payload: { ...subject } })}
                  onDelete={() => setSubjectName(subject.subject_name)}
                  onEdit={() => dispatch({ type: "SET_EDIT_SUBJECT", payload: { ...subject } })}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default SpecificSectionList;
