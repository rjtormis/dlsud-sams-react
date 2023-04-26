import { useEffect, useRef } from "react";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useProfile } from "../../../context/ProfileContext";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";

function ProfileHeader() {
  const { prevLoc } = useAuth();
  const { resetState } = useSpecificSection();
  const { profID, profile, setProfID } = useProfile();
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
    <header>
      <h1 className="text-4xl text-green-800">
        {profID ? (
          <>
            <Link to={prevLoc} className="btn btn-primary mr-4" onClick={() => setProfID("")}>
              <MdArrowBack size={20} />
            </Link>
            Viewing {profile.name}
          </>
        ) : (
          "PROFILE"
        )}
      </h1>
    </header>
  );
}

export default ProfileHeader;
