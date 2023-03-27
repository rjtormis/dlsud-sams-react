import { useEffect, useRef } from "react";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
function ProfileHeader() {
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
    <header>
      <h1 className="text-4xl text-green-800">PROFILE</h1>
    </header>
  );
}

export default ProfileHeader;
