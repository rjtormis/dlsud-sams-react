import axios from "axios";
import { AiFillCheckCircle, AiOutlineDownload, AiTwotoneTrophy } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useAuth } from "../../../context/AuthContext";
// Components
import Modal from "../../Shared/Modal";
import SubjectStudentsTable from "./SubjectStudentsTable";
import SubjectLeaderboardTable from "./SubjectLeaderboardTable";

function SubjectBody() {
  const { subject, studentToRemove, subjectToRemove } = useSpecificSection();
  const { auth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `/api/v1/subjects/${subjectToRemove}/${studentToRemove}/enrolled`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": auth.csrf_access_token,
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
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

      <Modal id="remove_student">
        <div className="flex">
          <AiFillDelete size={20} className="my -auto mr-4" color="#E94951" />
          <h1 className="text-xl font-[900]">Remove Student</h1>
        </div>
        <div className="w-full mt-4">
          <p className="text-center">Would you like to remove {studentToRemove}?</p>
          <form className="mt-4" onSubmit={handleSubmit}>
            <button type="submit" value="" className="btn btn-error w-full">
              Remove
            </button>
          </form>
        </div>
        {/* <input type="hidden" name="studentNo" value={sub.studentNo} /> */}
      </Modal>
    </div>
  );
}
export default SubjectBody;
