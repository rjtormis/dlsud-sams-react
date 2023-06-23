import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { BarChart } from "../../charts/BarChart";
import useFetch from "../../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";

if (process.env.REACT_APP_ENV === "DEV") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
} else if (process.env.REACT_APP_ENV === "PROD") {
  axios.defaults.baseURL = process.env.REACT_APP_API;
}

function MainGraph() {
  const { auth } = useAuth();
  const [currentData, setCurrentData] = useState([]);
  const { data, loading } = useFetch("/api/v1/graph", "graph", auth);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (data !== null) {
      setCurrentData(data);
    }
  }, [data]);

  const handleSubChange = (e) => {
    setSelected(e.target.value);
    console.log(e.target.value);
  };

  const filtered_data = currentData.filter(({ sub_name }) => sub_name === selected);

  return (
    <>
      <div className="flex-1 mt-4 flex">
        {loading ? (
          <ClipLoader />
        ) : (
          <>
            <div className="flex stat shadow bg-white rounded-lg h-[400px] w-1/2">
              <BarChart graphData={filtered_data} />
            </div>
            <div className="ml-4 flex flex-col">
              <select
                name=""
                id=""
                className="select bg-success select-bordered"
                value={selected}
                onChange={handleSubChange}
              >
                <option value="default">Select subject</option> {/* Default option */}
                {currentData.length > 0
                  ? currentData.map(({ sub_name }) => (
                      <option key={sub_name} value={sub_name}>
                        {sub_name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MainGraph;
