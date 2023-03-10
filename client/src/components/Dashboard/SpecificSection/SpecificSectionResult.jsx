import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useSpecificSection from "../../../hooks/useSpecificSection";
import SpecificSectionSubjectItem from "./SpecificSectionSubjectItem";

function SpecificSectionResult() {
  const { section, dispatch, subject } = useSpecificSection();
  const [deleteSub, setDeleteSub] = useState("");
  const [editSub, setEditSub] = useState({});
  const subjects = section.subjects;

  useEffect(() => {
    dispatch({ type: "SET_SUBJECT", payload: { ...editSub } });
  }, [dispatch, editSub]);

  useEffect(() => {
    dispatch({ type: "SET_SUBJECT_NAME", payload: deleteSub });
  }, [dispatch, deleteSub]);
  return (
    <>
      <div id="subject-container" className="flex-1 mt-2 rounded-t-lg">
        <div className="bg-green-800 p-2 rounded-t-lg">
          <button className=" btn btn-sm text-black mr-4">ALL</button>
          <button className="text-white">HANDLED</button>
        </div>
        <div className="grid grid-cols-4 p-2 gap-4">
          {subjects === undefined ? (
            <ClipLoader />
          ) : (
            subjects.map((subject) => (
              <SpecificSectionSubjectItem
                key={subject.id}
                name={subject.subject_name}
                professor={subject.handled_by}
                schedule={subject.schedule}
                onDelete={() => setDeleteSub(subject.subject_name)}
                onEdit={() => setEditSub(subject)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default SpecificSectionResult;
