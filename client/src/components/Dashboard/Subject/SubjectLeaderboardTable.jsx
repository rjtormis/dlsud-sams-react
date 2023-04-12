import sample from "../../../assets/sample-profile.jfif";
function SubjectLeaderboardTable() {
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
        <tr className="text-center">
          <td>1</td>
          <td className="flex content-center">
            <div className="avatar">
              <div className="rounded-full w-8">
                <img src={sample} alt="profile" />
              </div>
            </div>
            <p className="m-auto">Ranel John Tormis</p>
          </td>
          <td>10</td>
        </tr>
      </tbody>
    </table>
  );
}
export default SubjectLeaderboardTable;
