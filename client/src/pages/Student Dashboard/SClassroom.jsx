import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
// Components
import Loader from "../../components/Shared/Loader";
import SSubjectItem from "../../components/Student Dashboard/SSubjectItem";

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
    <main className="ml-[100px] mr-[60px] mt-5 bg-[#fbfbfb] h-full flex flex-col">
      <header className="flex">
        <h1 className="text-3xl text-secondary">My Subjects</h1>
      </header>
      {loading === false && subjects !== undefined ? (
        <section className="grid grid-cols-4 gap-4 mt-4">
          {subjects.map((subject) => (
            <SSubjectItem key={subject.subject_name} subject={subject} />
          ))}
        </section>
      ) : (
        <Loader
          style_div="text-center my-auto"
          type={<HashLoader color="#436147" className="mx-auto" size={80} />}
        />
      )}
    </main>
  );
}
export default SClassroom;
