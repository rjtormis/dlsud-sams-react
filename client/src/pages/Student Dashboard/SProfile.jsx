import sample from "../../assets/spiderman.png";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";

import { ImOffice } from "react-icons/im";
import { BsClockFill } from "react-icons/bs";

function SProfile() {
  return (
    <>
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
                  <img src={sample} alt="profile" />
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex">
                  <h1 className="text-4xl">Juan</h1>

                  <span className="badge badge-primary inline-block my-auto ml-4">STUDENT</span>
                </div>
                <div className="mt-2">
                  <div className="form-control">
                    <label htmlFor="" className="label font-bold">
                      Biography
                    </label>

                    <p className="p-1">bio</p>
                  </div>
                  <div className="mt-4 flex">
                    <div className="stats shadow w-full">
                      <div className="stat">
                        <div className="stat-figure">
                          <ImOffice size={20} />
                        </div>
                        <div className="stat-tile font-bold">COLLEGIATE</div>
                        <div className="stat-desc">CSCS</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="" className="label font-bold">
                      Socials
                    </label>

                    <div id="socials" className="flex">
                      <a href="fb.com" className="">
                        <SlSocialFacebook size={20} />
                      </a>
                      <a href="instagram.com" className="">
                        <SlSocialInstagram size={20} />
                      </a>
                      <a href="linkedin.com">
                        <SlSocialLinkedin size={20} />
                      </a>
                      <a href="twitter.com">
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
    </>
  );
}
export default SProfile;
