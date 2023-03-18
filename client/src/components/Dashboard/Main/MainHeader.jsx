// Context
import { useAuth } from "../../../context/AuthContext";
import BeatLoader from "react-spinners/BeatLoader";

function MainHeader() {
  const { auth } = useAuth();

  return (
    <>
      <h1 className="text-4xl text-green-800">DASHBOARD</h1>
      <p className="text-xl">{auth ? <>Welcome {auth.name}</> : <BeatLoader />}!</p>
    </>
  );
}

export default MainHeader;
