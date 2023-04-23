import { createContext, useContext, useEffect, useState } from "react";

const StudentDashboardContext = createContext();

export const StudentDashboardContextProvider = ({ children }) => {
  const [sub, setSub] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search !== "") {
      const res = sub.enrolled.filter(
        (student) =>
          student.studentNo === search || student.name === search || student.emailAddress === search
      );
      setResult(res[0]);
    }
  }, [search, sub, result]);

  return (
    <StudentDashboardContext.Provider
      value={{ sub, setSub, loading, setLoading, search, setSearch, result, setResult }}
    >
      {children}
    </StudentDashboardContext.Provider>
  );
};

export function useStudentDashboardContext() {
  return useContext(StudentDashboardContext);
}

export default StudentDashboardContext;
