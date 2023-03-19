function AllSectionHeader() {
  return (
    <>
      <h1 className="text-4xl text-green-800">SECTIONS</h1>
      <div className="flex justify-end">
        <a href="#create" className="btn btn-md btn-primary mr-4">
          CREATE
        </a>
        <div className="form-control">
          <form action="">
            <div className="input-group input-group-sm">
              <input type="text" placeholder="Search" className="input input-md input-bordered" />
              <button className="btn btn-md btn-primary btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AllSectionHeader;
