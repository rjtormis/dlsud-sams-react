import { Helmet } from "react-helmet";
import { MdOutlineErrorOutline } from "react-icons/md";

// Components
import ProfileBody from "../../components/Dashboard/Profile/ProfileBody";
import ProfileHeader from "../../components/Dashboard/Profile/ProfileHeader";
import Alert from "../../components/Shared/Alert";

// Context
import { useProfile } from "../../context/ProfileContext";
function Profile() {
  const { fileError, fileErrorMsg } = useProfile();

  return (
    <>
      <Helmet>
        <title>DLSUD SAMS | PROFILE</title>
      </Helmet>
      <ProfileHeader />
      {fileError ? (
        <Alert icon={<MdOutlineErrorOutline />} msg={fileErrorMsg} custom="alert-error mt-2" />
      ) : null}
      <ProfileBody />
    </>
  );
}

export default Profile;
