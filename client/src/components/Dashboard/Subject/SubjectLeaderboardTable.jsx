import axios from "axios";
import { aws_user_url } from "../../../utilities/Helper";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
// axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.baseURL = "https://dlsud-sams-react-production.up.railway.app";

function SubjectLeaderboardTable() {
  const { auth } = useAuth();
  const { subject, refetch, setRefetch } = useSpecificSection();

  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `/api/v1/subjects/${subject.section}/${subject.subject_name}`,
          { headers: { Authorization: `Bearer ${auth.access_token}` } }
        );
        setRankings(response.data.ranking);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
    return () => setRefetch(false);
  }, [subject, refetch, setRefetch, auth]);
  return (
    <table className="table table-zebra w-full mt-2">
      <thead>
        <tr className="text-center sticky top-0">
          <th className="bg-secondary text-white cursor-default">Rank</th>
          <th className="bg-secondary text-white cursor-default">Name</th>
          <th className="bg-secondary text-white cursor-default">T.A</th>
        </tr>
      </thead>
      <tbody>
        {rankings !== undefined
          ? rankings.map((rank) => (
              <tr key={rank.rank} className="text-center">
                <td>{rank.rank}</td>
                <td className="flex content-center">
                  <div className="avatar">
                    <div className="rounded-full w-8">
                      <img src={aws_user_url + rank.user.profile_image} alt="profile" />
                    </div>
                  </div>
                  <p className="m-auto">{rank.user.name}</p>
                </td>
                <td>{rank.total}</td>
              </tr>
            ))
          : ""}
      </tbody>
    </table>
  );
}
export default SubjectLeaderboardTable;
