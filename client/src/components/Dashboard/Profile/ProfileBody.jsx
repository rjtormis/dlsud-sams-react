import { ImOffice } from "react-icons/im";
import { BsClockFill } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";
import { Formik } from "formik";
import HashLoader from "react-spinners/HashLoader";

// Components
import Select from "../../Shared/Select";
import Input from "../../Shared/Input";
import Loader from "../../Shared/Loader";

// Context
import { useProfile } from "../../../context/ProfileContext";
import { useAuth } from "../../../context/AuthContext";
import { getPresignedURL, update_profile } from "../../../actions/Profile";
import { profileSchema } from "../../../schemas/ProfileSchema";

// Helper
import {
  aws_user_url,
  maxFileSize,
  supported_file_format,
  upload_to_s3,
} from "../../../utilities/Helper";

// Assets
import invalid from "../../../assets/invalid.png";

function ProfileBody() {
  const {
    profile,
    collegiates,
    loading,
    setLoading,
    onEdit,
    setOnEdit,
    imagePreview,
    setImagePreview,
    fileInputRef,
    dispatch,
    setFileError,
    setFileErrorMsg,
  } = useProfile();

  const { auth, setUpdated, setAuth } = useAuth();

  const handleImageChange = (e, props) => {
    setFileError(false);
    setFileErrorMsg("");
    setImagePreview("");
    props.setFieldValue("file", e.currentTarget.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file.size <= maxFileSize && supported_file_format.includes(file.type)) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    } else {
      setFileError(true);
      setFileErrorMsg("Unsupported File Format or File is too large.");
      setImagePreview(invalid);
    }
  };

  const handleEdit = () => {
    setImagePreview("");
    setOnEdit(!onEdit);
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleOnSubmit = async (state, action) => {
    const { file, ...rest } = state;
    try {
      setLoading(true);
      if (file === "") {
        await update_profile(profile, auth, "", false, rest);
        setAuth({ ...auth, name: state.name });
        dispatch({ type: "SET_UPLOAD_SUCCESS", profile: { ...state } });
        setLoading(false);
        setUpdated(false);
        setOnEdit(false);
        setImagePreview("");
      } else {
        if (file.size <= maxFileSize && supported_file_format.includes(file.type)) {
          setFileError(false);
          setFileErrorMsg("");
          setUpdated(true);
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
          await update_profile(profile, auth, true, location, rest, "professor");
          setAuth({ ...auth, name: state.name, profile_image: location });
          dispatch({ type: "SET_UPLOAD_SUCCESS", profile: { ...state } });
          setLoading(false);
          setUpdated(false);
          setOnEdit(false);
          setImagePreview("");
        } else {
          action.setFieldError("file", "Unsupported File Format or File is too large.");
          setFileError(true);
          setFileErrorMsg("Unsupported File Format or File is too large.");
          setLoading(false);
          setImagePreview(invalid);
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex-1 flex flex-col justify-center">
          <Loader
            style_div="text-center"
            type={<HashLoader color="#436147" className="m-auto" size={120} />}
          />
        </div>
      ) : (
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
            validationSchema={profileSchema}
          >
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
                    <div className="rounded-xl ">
                      {/* outline-error outline-3 outline */}
                      <img
                        src={imagePreview !== "" ? imagePreview : aws_user_url + auth.profile_image}
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex">
                      {onEdit ? (
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
                        {onEdit ? (
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
                              {onEdit ? (
                                <Select
                                  name="collegiate"
                                  styles="select-sm"
                                  value={props.values.collegiate}
                                  onChange={props.handleChange}
                                >
                                  {collegiates.map((collegiate, index) => (
                                    <option key={index} value={collegiate.name}>
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
                              {onEdit ? (
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
        </div>
      )}
    </>
  );
}

export default ProfileBody;
