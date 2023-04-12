import SubjectStudentsTable from "./SubjectStudentsTable";
import { AiFillCheckCircle, AiOutlineDownload, AiTwotoneTrophy } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import SubjectLeaderboardTable from "./SubjectLeaderboardTable";

function SubjectBody() {
  const { subject } = useSpecificSection();
  return (
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex justify-between mb-2">
            <div>
              <h1 className="text-2xl text-primary">STUDENTS ENROLLED</h1>
              <h1 className="text-xs">COURSE CODE: {subject.code}</h1>
            </div>
            <div className="mr-2">
              <div className="flex m-auto justify-end">
                <div className="tooltip tooltip-primary mr-2" data-tip="Start attendance">
                  <button>
                    <AiFillCheckCircle size={20} />
                  </button>
                </div>
                <div className="tooltip tooltip-primary mr-2" data-tip="Download attendance">
                  <button>
                    <AiOutlineDownload size={20} />
                  </button>
                </div>
                <div className="tooltip tooltip-primary" data-tip="Refresh">
                  <button>
                    <BiRefresh size={20} />
                  </button>
                </div>
              </div>
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
            <SubjectStudentsTable />
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
            <SubjectLeaderboardTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SubjectBody;
