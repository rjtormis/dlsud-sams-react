import { api } from "../utilities/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const StudentDashboardContext = createContext();

export const StudentDashboardContextProvider = ({ children }) => {
  const { auth } = useAuth();
  const [sub, setSub] = useState("");
  const [prevLoc, setPrevLoc] = useState("");
  const [search, setSearch] = useState("");
  const [profID, setProfID] = useState("");
  const [collegiates, setCollegiates] = useState([]);
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

  useEffect(() => {
    const fetchCollegiates = async () => {
      try {
        const response = await api.get("/api/v1/collegiates", {
          headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token },
        });
        setCollegiates(response.data.collegiates);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCollegiates();
  }, [auth]);

  return (
    <StudentDashboardContext.Provider
      value={{
        sub,
        setSub,
        loading,
        setLoading,
        search,
        setSearch,
        result,
        setResult,
        collegiates,
        setCollegiates,
        prevLoc,
        setPrevLoc,
        profID,
        setProfID,
      }}
    >
      {children}
    </StudentDashboardContext.Provider>
  );
};

export function useStudentDashboardContext() {
  return useContext(StudentDashboardContext);
}

export default StudentDashboardContext;
