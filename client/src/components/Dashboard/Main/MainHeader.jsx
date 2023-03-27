import { useEffect, useRef } from "react";
import BeatLoader from "react-spinners/BeatLoader";
// Context
import { useAuth } from "../../../context/AuthContext";
import { useSpecificSection } from "../../../context/SpecificSectionContext";

function MainHeader() {
  const { auth } = useAuth();
  const { resetState } = useSpecificSection();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted) {
      resetState();
    }
    return () => {
      isMounted.current = true;
    };
  }, [isMounted, resetState]);

  return (
    <>
      <h1 className="text-4xl text-green-800">DASHBOARD</h1>
      <p className="text-xl">{auth ? <>Welcome {auth.name}</> : <BeatLoader />}!</p>
    </>
  );
}

export default MainHeader;
