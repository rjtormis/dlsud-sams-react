import { AiTwotoneTrophy } from "react-icons/ai";
import SSubjectLeaderboardTable from "../../components/Student Dashboard/SSubjectLeaderboardTable";
import SSubjectStudentsTable from "../../components/Student Dashboard/SSubjectStudentsTable";
function SSubject() {
  return (
    <div className="flex-1 ml-[100px] mr-[60px] mt-4">
      <div className="grid grid-cols-3 gap-4 z-10">
        <div className="col-span-2">
          <div className="flex justify-between mb-2">
            <div>
              <h1 className="text-2xl text-primary font-[900]">Subject name</h1>
              <h3 className="text-xs">Section: Section Kamote</h3>
              <h3 className="text-xs">COURSE CODE: 123</h3>
              <h3 className="text-xs">Professor: Professor Kamote</h3>
            </div>
            <div className="mr-2">
              <div>
                <input
                  type="text"
                  className="input input-xs input-primary"
                  placeholder="Search student"
                />
              </div>
            </div>
          </div>
          <div className=" overflow-y-auto h-[520px]">
            <SSubjectStudentsTable />
          </div>
        </div>
        <div className="col-span-1">
          <header>
            <h1 className="text-2xl flex">
              LEADERBOARD
              <span className="ml-4">
                <AiTwotoneTrophy className="" />
              </span>
            </h1>
          </header>
          <div className="h-[510px] overflow-y-auto">
            <SSubjectLeaderboardTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SSubject;
