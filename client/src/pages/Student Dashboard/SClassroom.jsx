import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import SSubjectItem from "../../components/Student Dashboard/SSubjectItem";
import { useEffect, useState } from "react";

function SClassroom() {
  const { auth } = useAuth();
  const [subjects, setSubjects] = useState();
  const [loading, setLoading] = useState(false);
  const fetch = async (auth) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/students/${auth.id}`);
      setSubjects(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(auth);
  }, [auth]);
  return (
    <main className="ml-[100px] mr-[60px] mt-5 bg-[#fbfbfb]">
      <header className="flex">
        <h1 className="text-3xl text-secondary">My Subjects</h1>
      </header>
      <section className="grid grid-cols-4 gap-4 mt-4">
        {loading === false && subjects !== undefined
          ? subjects.map((subject) => <SSubjectItem key={subject.subject_name} subject={subject} />)
          : "nay"}
      </section>
    </main>
  );
}
export default SClassroom;
