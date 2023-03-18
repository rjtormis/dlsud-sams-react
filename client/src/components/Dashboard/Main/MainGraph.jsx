import LineChart from "../../charts/LineChart";
function MainGraph() {
  return (
    <>
      <div className="grid grid-cols-4 flex-1 mt-4">
        <div className="col-span-2 stat shadow bg-white rounded-lg">
          <LineChart />
        </div>
      </div>
    </>
  );
}

export default MainGraph;
