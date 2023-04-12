import SectionItem from "./SectionItem";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

function SectionList() {
  const [filteredSubject, setFilteredSubject] = useState([]);
  const { auth } = useAuth();
  const { section, filter } = useSpecificSection();
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
              <SectionItem
                key={subject.id}
                isProfessor={auth.id === subject.handler_id}
                subject={subject}
              />
            ))
          : subjects.map((subject) => (
              <SectionItem
                key={subject.id}
                isProfessor={auth.id === subject.handler_id}
                subject={subject}
              />
            ))}
      </div>
    </>
  );
}

export default SectionList;
