import { useContext } from "react";
import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { RiUserSettingsFill, RiLogoutBoxRFill } from "react-icons/ri";
import { Outlet, Link } from "react-router-dom";

import logo from "../assets/dlsu-d.png";
import profile from "../assets/sample-profile.jfif";

// Context
import { DashboardContextProvider } from "../context/DashboardContext";
function DashboardLayout() {
  return (
    // <DashboardContextProvider>
    <div id="dashboard-container" className="h-screen flex flex-col">
      <header className="h-12 p-2 relative shadow-sm" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="flex">
          <div className="absolute top-2 left-2">
            <img src={logo} alt="DLSUD LOGO" className="w-36" />
          </div>

          <div className="ml-auto avatar dropdown dropdown-end hover:cursor-pointer">
            <div className="w-8 h-8 rounded-xl" tabIndex={0}>
              <img src={profile} alt="" className="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <div className="p-1 relative shadow" style={{ backgroundColor: "#FAFAFA" }}>
          <ul className="flex flex-col">
            <li className="tooltip tooltip-right" data-tip="Dashboard">
              <Link to="/dashboard" className="flex btn btn-ghost btn-square">
                <div>
                  <MdDashboard color="#224429" size={25} className="block m-auto" />
                </div>
              </Link>
            </li>
            <li className="mt-4 tooltip tooltip-right" data-tip="Classroom">
              <Link to="/dashboard/classroom" className="flex btn btn-ghost btn-square">
                <div>
                  <HiUserGroup color="#224429" size={25} className="block m-auto" />
                </div>
              </Link>
            </li>
            <li className="mt-4 tooltip tooltip-right" data-tip="Profile">
              <Link to="dashboard/profile" className="flex btn btn-ghost btn-square">
                <div>
                  <RiUserSettingsFill color="#224429" size={25} className="block m-auto" />
                </div>
              </Link>
            </li>
            <li className="mt-4 tooltip tooltip-right absolute bottom-4" data-tip="Logout">
              <Link to="/dashboard" className="flex btn btn-ghost btn-square">
                <div>
                  <RiLogoutBoxRFill color="#224429" size={25} className="block m-auto" />
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* INSERT HERE */}
        <div id="dashboard-main" className="flex-1  p-5">
          <Outlet />
        </div>
      </div>
    </div>
    // </DashboardContextProvider>
  );
}
export default DashboardLayout;
