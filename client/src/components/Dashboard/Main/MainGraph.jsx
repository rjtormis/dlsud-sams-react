import { BarChart } from "../../charts/BarChart";
import Select from "../../Shared/Select";
function MainGraph() {
  return (
    <>
      <div className="flex-1 mt-4">
        <div className="flex stat shadow bg-white rounded-lg h-[400px] w-1/2">
          <BarChart />
        </div>
      </div>
    </>
  );
}

export default MainGraph;
