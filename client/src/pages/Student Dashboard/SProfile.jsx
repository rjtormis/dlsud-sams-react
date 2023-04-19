import sample from "../../assets/spiderman.png";
import { aws_user_url } from "../../utilities/Helper";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";

import { ImOffice } from "react-icons/im";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function SProfile() {
  const { auth } = useAuth();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/v1/profiles/${auth.id}/student`);
        setProfile(response.data.user);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetch();
  }, [auth]);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main className="ml-[100px] mr-[60px] my-auto">
          <header className="">
            <h1 className="text-4xl text-secondary"> MY PROFILE</h1>
          </header>

          <div className="flex-1 flex flex-col justify-center mt-16">
            <form action="" onSubmit={() => console.log("1")}>
              <div className="grid grid-cols-3 gap-4">
                <div className="avatar relative">
                  <div className="rounded-xl ">
                    {/* outline-error outline-3 outline */}
                    <img src={aws_user_url + auth.profile_image} alt="profile" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex">
                    <h1 className="text-4xl">{profile.name}</h1>

                    <span className="badge badge-primary inline-block my-auto ml-4">STUDENT</span>
                  </div>
                  <div className="mt-2">
                    <div className="form-control">
                      <label htmlFor="" className="label font-bold">
                        Biography
                      </label>

                      <p className="p-1">{profile.bio}</p>
                    </div>
                    <div className="mt-4 flex">
                      <div className="stats shadow w-full">
                        <div className="stat">
                          <div className="stat-figure">
                            <ImOffice size={20} />
                          </div>
                          <div className="stat-tile font-bold">COLLEGIATE</div>
                          <div className="stat-desc">{profile.collegiate}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="" className="label font-bold">
                        Socials
                      </label>

                      <div id="socials" className="flex">
                        <a href={profile.socials.fb} className="">
                          <SlSocialFacebook size={20} />
                        </a>
                        <a href={profile.socials.instagram} className="">
                          <SlSocialInstagram size={20} />
                        </a>
                        <a href={profile.socials.linkedIn}>
                          <SlSocialLinkedin size={20} />
                        </a>
                        <a href={profile.socials.twitter}>
                          <SlSocialTwitter size={20} />
                        </a>
                      </div>
                    </div>
                    {/* <div className="mt-4 flex justify-end">
              <button
                className={`btn btn-${onEdit ? "error mr-4" : "primary"} `}
                onClick={handleEdit}
                type="button"
              >
                {onEdit ? "CANCEL" : "EDIT"}
              </button>
              {onEdit ? (
                <>
                  <button className="btn btn-primary" type="submit">
                    SAVE
                  </button>
                </>
              ) : null}
            </div> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}
export default SProfile;
