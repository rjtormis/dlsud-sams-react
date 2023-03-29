import SubjectStudentsTable from "./SubjectStudentsTable";
function SubjectBody() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <div className="flex justify-evenly mb-2">
            <button className="btn btn-primary">START ATTENDANCE</button>
            <p className="text-2xl">STUDENTS ENROLLED</p>
            <button className="btn btn-primary">DOWNLOAD ATTENDANCE</button>
          </div>
          <div className="h-96 overflow-y-auto">
            <SubjectStudentsTable />
          </div>
        </div>
        <div className="col-span-1">OK</div>
      </div>
    </div>
  );
}
export default SubjectBody;
