import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { RiUserSettingsFill, RiLogoutBoxRFill } from "react-icons/ri";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

import logo from "../assets/dlsu-d.png";

// Context
import { useAuth } from "../context/AuthContext";
import { SpecificSectionContextProvider } from "../context/SpecificSectionContext";
import { ProfileContextProvider } from "../context/ProfileContext";
import { aws_user_url } from "../utilities/Helper";

function DashboardLayout() {
  const navigate = useNavigate();

  const { auth, logout, loading, setLoading, updated, setRefetch } = useAuth();
  useEffect(() => {
    if (auth !== null) {
      setLoading(false);
    }
  }, [auth, setLoading]);
  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout", {});
      if (response.status === 200) {
        logout();
        navigate("/");
      }
    } catch (e) {}
  };
  return (
    <div id="dashboard-container" className="h-screen flex flex-col">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header className="h-12 p-2 relative shadow-sm" style={{ backgroundColor: "#FAFAFA" }}>
            <div className="flex">
              <div className="absolute top-2 left-2">
                <img src={logo} alt="DLSUD LOGO" className="w-36" />
              </div>

              <div className="ml-auto avatar dropdown dropdown-end hover:cursor-pointer">
                <div className="w-8 h-8 rounded-xl" tabIndex={0}>
                  {updated ? (
                    <ClipLoader size={30} />
                  ) : (
                    <img src={aws_user_url + auth.profile_image} alt="profile" className="" />
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/dashboard/profile">Profile</Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <div className="flex-1 flex">
            <div className="p-1 relative shadow" style={{ backgroundColor: "#FAFAFA" }}>
              <ul className="flex flex-col">
                <li className="tooltip tooltip-right tooltip-primary" data-tip="Dashboard">
                  <Link to="/dashboard" className="flex btn btn-ghost btn-square">
                    <div>
                      <MdDashboard color="#224429" size={25} className="block m-auto" />
                    </div>
                  </Link>
                </li>
                <li className="mt-4 tooltip tooltip-right tooltip-primary" data-tip="Classroom">
                  <Link to="/dashboard/sections" className="flex btn btn-ghost btn-square">
                    <div>
                      <HiUserGroup color="#224429" size={25} className="block m-auto" />
                    </div>
                  </Link>
                </li>
                <li className="mt-4 tooltip tooltip-right tooltip-primary" data-tip="Profile">
                  <Link
                    to="/dashboard/profile"
                    className="flex btn btn-ghost btn-square"
                    onClick={() => setRefetch(true)}
                  >
                    <div>
                      <RiUserSettingsFill color="#224429" size={25} className="block m-auto" />
                    </div>
                  </Link>
                </li>
                <li
                  className="mt-4 tooltip tooltip-right absolute bottom-4 tooltip-primary"
                  data-tip="Logout"
                >
                  <button onClick={handleLogout} className="flex btn btn-ghost btn-square">
                    <div>
                      <RiLogoutBoxRFill color="#224429" size={25} className="block m-auto" />
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            {/* INSERT HERE */}
            <div id="dashboard-main" className="flex-1 flex flex-col  p-5">
              <ProfileContextProvider>
                <SpecificSectionContextProvider>
                  <Outlet />
                </SpecificSectionContextProvider>
              </ProfileContextProvider>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default DashboardLayout;
