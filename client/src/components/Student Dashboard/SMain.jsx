import { Helmet } from "react-helmet";
import { HiUserGroup } from "react-icons/hi";
import { ImBook } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import { MdQueryStats } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

function SMain() {
  return (
    <>
      <main className="ml-[100px] mr-[60px] mt-5 bg-[#fbfbfb]">
        <header>
          <h1 className="text-4xl text-secondary">Welcome back, Juan!</h1>
          <p className="text-[14px]">Wednesday, 21 Jan</p>
        </header>

        <section className="mt-4">
          <header className="flex justify-between mb-4">
            <h2 className="text-xl text-secondary my-auto">Insights</h2>
            <div className="form-control justify-end">
              <label className="label">
                <span className="label-text">Enroll subject</span>
              </label>
              <div className="input-group ">
                <input
                  type="text"
                  placeholder="Enroll subject"
                  className="input input-sm input-secondary"
                />
                <button className="btn btn-secondary btn-sm">
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-4 gap-4">
            <section className="sd-card p-6 hover:bg-secondary">
              <div className=" flex justify-center p-6">
                <div className="bg-secondary p-4 rounded-md">
                  <HiUserGroup size={50} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl text-center">Total classrooms</h2>
              <p className="text-3xl text-center font-[900]">10</p>
            </section>

            <section className="sd-card p-6 hover:bg-secondary">
              <div className=" flex justify-center p-6">
                <div className="bg-secondary p-4 rounded-md">
                  <ImBook size={50} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl text-center">Juan's Subjects</h2>
              <p className="text-3xl text-center font-[900]">10</p>
            </section>

            <section className="sd-card p-6 hover:bg-secondary">
              <div className=" flex justify-center p-6">
                <div className="bg-secondary p-4 rounded-md">
                  <GiTeacher size={50} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl text-center">Total Lectures attended</h2>
              <p className="text-3xl text-center font-[900]">10</p>
            </section>

            <section className="sd-card p-6 hover:bg-secondary">
              <div className=" flex justify-center p-6">
                <div className="bg-secondary p-4 rounded-md">
                  <MdQueryStats size={50} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl text-center">Attendance of Juan</h2>
              <p className="text-3xl text-center font-[900]">69%</p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
export default SMain;
