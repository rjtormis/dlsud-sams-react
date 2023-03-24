import SpecificSectionItem from "./SpecificSectionItem";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useMemo, useState } from "react";

function SpecificSectionList() {
  const [filteredSubject, setFilteredSubject] = useState([]);
  const { auth } = useAuth();
  const { section, dispatch, setSubjectName, filter } = useSpecificSection();
  const subjects = section.subjects;

  useEffect(() => {
    if (subjects !== undefined) {
      const filter_sub = subjects.filter((subject) => subject.handler_id === auth.id);
      setFilteredSubject(filter_sub);
    }
  }, [subjects, auth]);

  return (
    <>
      <div className="grid grid-cols-4 p-2 gap-4">
        {subjects === undefined
          ? null
          : filter
          ? filteredSubject.map((subject) => (
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
            ))
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
    </>
  );
}

export default SpecificSectionList;
