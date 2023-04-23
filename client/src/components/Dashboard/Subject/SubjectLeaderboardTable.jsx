import axios from "axios";
import { aws_user_url } from "../../../utilities/Helper";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useEffect, useState } from "react";
function SubjectLeaderboardTable() {
  const { subject, refetch, setRefetch } = useSpecificSection();

  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `/api/v1/subjects/${subject.section}/${subject.subject_name}`
        );
        setRankings(response.data.ranking);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
    return () => setRefetch(false);
  }, [subject, refetch, setRefetch]);
  return (
    <table className="table table-zebra w-full mt-2">
      <thead>
        <tr className="text-center sticky top-0">
          <th className="bg-secondary text-white">Rank</th>
          <th className="bg-secondary text-white">Name</th>
          <th className="bg-secondary text-white">T.A</th>
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
