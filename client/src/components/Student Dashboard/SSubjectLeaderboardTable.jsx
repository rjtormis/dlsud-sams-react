import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

// Context
import { useStudentDashboardContext } from "../../context/StudentDashboardContext";
import { useAuth } from "../../context/AuthContext";

// Components
import Loader from "../Shared/Loader";

// Utils
import { aws_user_url } from "../../utilities/Helper";

function SSubjectLeaderboardTable() {
  const { sub, loading, setLoading } = useStudentDashboardContext();
  const { auth } = useAuth();
  const [ranking, setRanking] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/subjects/${sub.section}/${sub.subject_name}`, {
          headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token },
        });
        setRanking(response.data.ranking);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    fetch();
  }, [sub, auth, setLoading]);
  return (
    <>
      {loading ? (
        <Loader style_div="m-auto text-center" type={<ClipLoader color="#436147" className="" />} />
      ) : (
        <table className="table table-zebra w-full mt-2">
          <thead>
            <tr className="text-center sticky top-0">
              <th className="bg-secondary text-white">Rank</th>
              <th className="bg-secondary text-white">Name</th>
              <th className="bg-secondary text-white">T.A</th>
            </tr>
          </thead>
          <tbody>
            {ranking !== undefined
              ? ranking.map((student) => (
                  <tr className="text-center">
                    <td>1</td>
                    <td className="flex content-center">
                      <div className="avatar">
                        <div className="rounded-full w-8">
                          <img src={aws_user_url + student.user.profile_image} alt="profile" />
                        </div>
                      </div>
                      <p className="m-auto">{student.user.name}</p>
                    </td>
                    <td>{student.total}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      )}
    </>
  );
}
export default SSubjectLeaderboardTable;
