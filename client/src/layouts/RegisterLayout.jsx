import { useContext } from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/dlsu-d.png";
import Alert from "../components/Shared/Alert";
import CreateContext, { CreateContextProvider } from "../context/CreateContext";

function RegisterLayout() {
  return (
    <CreateContextProvider>
      <div className="grid grid-cols-1 h-screen lg:grid-cols-3 xl:grid-cols-4">
        <div id="regBG" className="hidden lg:block col-span-1 xl:col-span-1 "></div>
        <div className="col-span-1 bg-white flex flex-col justify-center relative lg:col-span-2 p-8 xl:col-span-3">
          <div className="xl:absolute top-5 left-15 ">
            <img src={logo} className="w-48 m-auto sm:w-60" alt="" />
          </div>

          {/* RESTRUCTURE LATER */}
          <Outlet />
        </div>
      </div>
    </CreateContextProvider>
  );
}
export default RegisterLayout;
