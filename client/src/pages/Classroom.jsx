import { IoCreate } from "react-icons/io5";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import logo from "../assets/dlsu-d.png";

function Classroom() {
  return (
    <>
      <h1 className="text-4xl">CLASSROOMS</h1>
      <div className="flex justify-end">
        <a href="#my-modal-2" class="btn btn-primary mr-4">
          CREATE
        </a>
        <div className="form-control">
          <form action="">
            <div className="input-group input-group-sm">
              <input type="text" placeholder="Search" className="input input-bordered" />
              <button className="btn btn-primary btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL */}
      <div class="modal" id="my-modal-2">
        <div class="modal-box w-3/12 relative">
          <a href="#" class="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </a>
          <div className="flex">
            <AiOutlineAppstoreAdd class="block mr-2" size={30} />
            <h3 class="font-bold text-xl">ADD CLASSROOM</h3>
          </div>

          <form
            action=""
            className="
            flex flex-col
          "
          >
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="form-control w-full">
                <label htmlFor="label">
                  <span className="label-text">Whts ur name</span>
                </label>
                <input type="text" className="input input-bordered " />
              </div>
              <div className="form-control w-full">
                <label htmlFor="label">
                  <span className="label-text">Whts ur name</span>
                </label>
                <input type="text" className="input input-bordered " />
              </div>
            </div>
            <div className="form-control w-full">
              <label htmlFor="label">
                <span className="label-text">Whts ur name</span>
              </label>
              <input type="text" className="input input-bordered " />
            </div>
            <div class="modal-action">
              <input type="submit" value="CREATE" className="btn" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Classroom;
