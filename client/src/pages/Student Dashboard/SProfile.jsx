import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { Formik } from "formik";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";

import { MdUpload } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { useEffect, useRef, useState } from "react";

// Context
import { useAuth } from "../../context/AuthContext";
import { useStudentDashboardContext } from "../../context/StudentDashboardContext";
// Utils
import { aws_user_url, upload_to_s3 } from "../../utilities/Helper";
// Components
import Loader from "../../components/Shared/Loader";
import Select from "../../components/Shared/Select";
import Input from "../../components/Shared/Input";
import { getPresignedURL, update_profile } from "../../actions/Profile";

function SProfile() {
  const { auth, setAuth } = useAuth();
  const { collegiates } = useStudentDashboardContext();
  const [imagePreview, setImagePreview] = useState("");
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [tempProfile, setTempProfile] = useState({
    name: "",
    bio: "",
    collegiate: "",
    socials: {
      fb: "",
      instagram: "",
      twitter: "",
    },
    file: "",
  });
  const fileInputRef = useRef();
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/v1/profiles/${auth.id}/student`);
        setProfile(response.data.user);
        setTempProfile({ ...response.data.user });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetch();
  }, [auth, refetch]);

  const handleEdit = () => {
    setImagePreview("");
    setOnEdit(!onEdit);
  };
  const handleImageChange = (e, props) => {
    setImagePreview("");
    const file = e.target.files[0];
    props.setFieldValue("file", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handleSubmit = async (state, action) => {
    const { file, ...rest } = state;
    try {
      if (file === "") {
        const response = await axios.patch(
          `/api/v1/profiles/${auth.id}/student`,
          { ...rest },
          {
            headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token },
          }
        );
        setAuth({ ...auth, name: state.name });
        setRefetch(true);
        setOnEdit(false);
      } else {
        const formData = new FormData();
        const file_extension = file.name.split(".")[1];
        const presignedURL = await getPresignedURL(auth, file_extension);
        const { fields, url } = presignedURL.data.signed_url;
        const location = presignedURL.data.location;
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("file", file);
        await upload_to_s3(url, formData);
        console.log(presignedURL);
        await update_profile(profile, auth, true, location, rest, "student");
        setAuth({ ...auth, name: state.name, profile_image: location });
        setRefetch(true);
        setOnEdit(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <main className="ml-[100px] mr-[60px] my-auto">
        {loading ? (
          <Loader
            style_div="text-center"
            type={<HashLoader className="mx-auto" color="#436147" size={80} />}
          />
        ) : (
          <>
            <header className="">
              <h1 className="text-4xl text-secondary"> MY PROFILE</h1>
            </header>

            <div className="flex-1 flex flex-col justify-center mt-16">
              {profile !== undefined ? (
                <Formik initialValues={tempProfile} onSubmit={handleSubmit}>
                  {(props) => (
                    <form action="" onSubmit={props.handleSubmit}>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="avatar relative">
                          {onEdit ? (
                            <>
                              <div className="rounded-xl w-full h-full bg-black absolute opacity-50"></div>
                              <div className="absolute w-full h-full flex">
                                <div
                                  className="h-full flex flex-col content-center justify-center cursor-pointer"
                                  onClick={() => fileInputRef.current.click()}
                                >
                                  <MdUpload className="mx-auto" size={28} color="white" />
                                  <p className="text-white text-xl text-center">Upload Photo</p>
                                </div>
                              </div>
                              <input
                                type="file"
                                name="file"
                                onChange={(e) => handleImageChange(e, props)}
                                hidden
                                ref={fileInputRef}
                              />
                            </>
                          ) : (
                            ""
                          )}
                          <div className="rounded-xl ">
                            <img
                              src={
                                imagePreview !== ""
                                  ? imagePreview
                                  : aws_user_url + auth.profile_image
                              }
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex">
                            {onEdit ? (
                              <Input
                                type="text"
                                name="name"
                                className="input input-primary"
                                value={props.values.name}
                                onChange={props.handleChange}
                              />
                            ) : (
                              <h1 className="text-4xl">{profile.name}</h1>
                            )}
                            <span className="badge badge-primary inline-block my-auto ml-4">
                              STUDENT
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="form-control">
                              <label htmlFor="" className="label font-bold">
                                Biography
                              </label>

                              {onEdit ? (
                                <textarea
                                  className="textarea textarea-bordered textarea-ghost  resize-none w-full"
                                  name="bio"
                                  cols="10"
                                  rows="2"
                                  value={props.values.bio}
                                  onChange={props.handleChange}
                                ></textarea>
                              ) : (
                                <p className="p-1">{profile.bio}</p>
                              )}
                            </div>
                            <div className="mt-4 flex">
                              <div className="stats shadow w-full">
                                <div className="stat">
                                  <div className="stat-figure">
                                    <ImOffice size={20} />
                                  </div>
                                  <div className="stat-tile font-bold">COLLEGIATE</div>
                                  {onEdit ? (
                                    <Select
                                      name="collegiate"
                                      value={props.values.collegiate}
                                      onChange={props.handleChange}
                                    >
                                      {collegiates.map((res) => (
                                        <option key={res.id} value={res.name}>
                                          {res.name}
                                        </option>
                                      ))}
                                    </Select>
                                  ) : (
                                    <div className="stat-desc">{profile.collegiate}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <label htmlFor="" className="label font-bold">
                                Socials
                              </label>
                              {onEdit ? (
                                <div className="">
                                  <SlSocialFacebook size={20} className="inline-block mr-2" />
                                  <Input
                                    name="socials.fb"
                                    placeholder="Facebook Link"
                                    styles="input-sm"
                                    value={props.values.socials.fb}
                                    target="_blank"
                                  />
                                  <SlSocialInstagram size={20} className="inline-block ml-3 mr-3" />
                                  <Input
                                    name="socials.instagram"
                                    placeholder="Instagram Link"
                                    value={props.values.socials.instagram}
                                    styles="input-sm"
                                    target="_blank"
                                  />

                                  <SlSocialTwitter size={20} className="inline-block ml-3 mr-3" />
                                  <Input
                                    name="socials.twitter"
                                    placeholder="Twitter Link"
                                    value={props.values.socials.twitter}
                                    styles="input-sm"
                                    target="_blank"
                                  />
                                </div>
                              ) : (
                                <div id="socials" className="flex">
                                  <a href={profile.socials.fb} className="">
                                    <SlSocialFacebook size={20} />
                                  </a>
                                  <a href={profile.socials.instagram} className="">
                                    <SlSocialInstagram size={20} />
                                  </a>
                                  <a href={profile.socials.twitter}>
                                    <SlSocialTwitter size={20} />
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="mt-4 flex justify-end">
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
export default SProfile;
