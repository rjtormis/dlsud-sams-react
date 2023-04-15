import { Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { RiUserSettingsFill, RiLogoutBoxRFill } from "react-icons/ri";
import logo from "../assets/resized-logo.png";
import profile from "../assets/spiderman.png";
function StudentDashboardLayout() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <header className="bg-sd-header h-[60px] flex justify-end border-b-[1px] border-solid border-[#35353530] ">
          <div className="ml-auto my-auto mr-4">
            <div className="avatar ">
              <div className="w-[40px] h-[40px] rounded-full border-secondary border-[1px] border-solid bg-white">
                <img src={profile} alt="student profile" className="max-w-full max-h-full" />
              </div>
            </div>
          </div>
        </header>
        <aside className="bg-white fixed p-2 top-0 left-0 bottom-0 border-r-[1px] border-solid border-[#b4b3b3a8] shadow-[3px_3px_3px_rgba(0, 0, 0, 0.049)]">
          <div className=" mb-4 flex justify-center">
            <img src={logo} alt="" className="w-[50px]" />
          </div>
          <div className="flex flex-col">
            <div
              className="tooltip tooltip-right tooltip-secondary mx-auto mb-3"
              data-tip="Dashboard"
            >
              <button className="btn btn-ghost">
                <MdDashboard color="bg-secondary" size={25} />
              </button>
            </div>
            <div
              className="tooltip tooltip-right tooltip-secondary mx-auto mb-3"
              data-tip="Classroom"
            >
              <button className="btn btn-ghost">
                <HiUserGroup color="bg-secondary" size={25} />
              </button>
            </div>
            <div className="tooltip tooltip-right tooltip-secondary mx-auto" data-tip="Profile">
              <button className="btn btn-ghost">
                <RiUserSettingsFill color="bg-secondary" size={25} />
              </button>
            </div>

            <div
              className="tooltip tooltip-right tooltip-secondary mx-auto absolute bottom-4"
              data-tip="Logout"
            >
              <button className="btn btn-ghost">
                <RiLogoutBoxRFill color="bg-secondary" size={25} />
              </button>
            </div>
          </div>
        </aside>

        <Outlet />
      </div>
    </>
  );
}
export default StudentDashboardLayout;
