import { ImOffice } from "react-icons/im";
import { BsClockFill } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";
import { useRef, useState } from "react";
import { Formik } from "formik";

import profile_img from "../../../assets/sample-profile.jfif";

// Components
import Select from "../../Shared/Select";
import Input from "../../Shared/Input";

// Hooks
import useProfile from "../../../hooks/useProfile";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

function ProfileBody() {
  const { profile, collegiates, setProfile } = useProfile();
  const [imagePreview, setImagePreview] = useState("");
  const { auth, setAuth } = useAuth();
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e, props) => {
    props.setFieldValue("file", e.currentTarget.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handleEdit = () => {
    setImagePreview("");
    setEdit(!edit);
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleOnSubmit = async (state, action) => {
    const { file, ...rest } = state;
    try {
      if (file !== "") {
        const file = state.file;
        const formData = new FormData();
        const file_extension = file.name.split(".")[1];

        const getPresignedURL = await axios.post(
          "/api/v1/user/get-pre-signed-url-profile",
          { id: auth.id, type: auth.type, fileName: `p_${auth.id}.${file_extension}` },
          {
            headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token },
          }
        );
        const { fields, url } = getPresignedURL.data.signed_url;
        const location = getPresignedURL.data.location;
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("file", file);
        const upload_to_s3 = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const response = await axios.patch(
          `/api/v1/profiles/${profile.id}`,
          { ...rest, profile_image: location },
          { headers: { "X-CSRF-TOKEN": auth.csrf_access_token } }
        );

        setAuth({ ...auth, name: state.name, profile_image: location });
      }

      setProfile({ ...state });
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Formik
        initialValues={{
          name: profile.name,
          bio: profile.bio,
          collegiate: profile.collegiate,
          consultation: profile.consultation,
          socials: {
            fb: profile.socials.fb,
            instagram: profile.socials.instagram,
            linkedIn: profile.socials.linkedIn,
            twitter: profile.socials.twitter,
          },
          file: "",
        }}
        onSubmit={handleOnSubmit}
      >
        {(props) => (
          <form action="" onSubmit={props.handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div className="avatar relative">
                {edit ? (
                  <>
                    <div className="rounded-xl w-full h-full bg-black absolute opacity-50"></div>
                    <div className="absolute w-full h-full flex">
                      <div
                        className="h-full flex flex-col content-center justify-center cursor-pointer"
                        onClick={handleUploadClick}
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
                ) : null}
                <div className="rounded-xl">
                  <img
                    src={imagePreview !== "" ? imagePreview : auth.profile_image}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex">
                  {edit ? (
                    <Input name="name" value={props.values.name} />
                  ) : (
                    <h1 className="text-4xl">{profile.name}</h1>
                  )}
                  <span className="badge badge-primary inline-block my-auto ml-4">
                    {profile.type}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="form-control">
                    <label htmlFor="" className="label font-bold">
                      Biography
                    </label>
                    {edit ? (
                      <>
                        <textarea
                          className="textarea textarea-bordered textarea-ghost  resize-none w-full"
                          name="bio"
                          cols="10"
                          rows="2"
                          value={props.values.bio}
                          onChange={props.handleChange}
                        ></textarea>
                      </>
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
                        <div className="stat-desc">
                          {edit ? (
                            <Select styles="select-sm">
                              {collegiates.map((collegiate, index) => (
                                <option
                                  key={index}
                                  value={collegiate.name}
                                  selected={profile.collegiate === collegiate.name ? true : false}
                                >
                                  {collegiate.name}
                                </option>
                              ))}
                            </Select>
                          ) : (
                            profile.collegiate
                          )}
                        </div>
                      </div>
                      <div className="stat">
                        <div className="stat-figure">
                          <BsClockFill size={20} />
                        </div>
                        <div className="stat-tile font-bold">Consultation Hours</div>
                        <div className="stat-desc">
                          {edit ? (
                            <Input
                              styles="input-sm w-full"
                              placeholder="Input consultation hours"
                              name="consultation"
                              value={props.values.consultation}
                            />
                          ) : (
                            profile.consultation
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="" className="label font-bold">
                      Socials
                    </label>
                    {edit ? (
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

                        <SlSocialLinkedin size={20} className="inline-block ml-3 mr-3" />
                        <Input
                          name="socials.linkedIn"
                          placeholder="LinkedIn Link"
                          value={props.values.socials.linkedIn}
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
                        <a href={profile.socials.linkedIn}>
                          <SlSocialLinkedin size={20} />
                        </a>
                        <a href={profile.socials.twitter}>
                          <SlSocialTwitter size={20} />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      className={`btn btn-${edit ? "error mr-4" : "primary"} `}
                      onClick={handleEdit}
                      type="button"
                    >
                      {edit ? "CANCEL" : "EDIT"}
                    </button>
                    {edit ? (
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
    </div>
  );
}

export default ProfileBody;
