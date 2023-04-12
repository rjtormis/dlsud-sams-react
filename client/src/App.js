import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Dashboard/Main";
import Section from "./pages/Dashboard/Section";
import Sections from "./pages/Dashboard/Sections";
import Student from "./pages/Register/Student";
import Professor from "./pages/Register/Professor";
import Subject from "./pages/Dashboard/Subject";
import Profile from "./pages/Dashboard/Profile";
import NotFound from "./pages/NotFound";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";

//
// import StudentMain from "./components/Student Dashboard/StudentMain";
// import StudentClassroom from "./components/Student Dashboard/StudentClassroom";
// import StudentProfile from "./components/Student Dashboard/StudentProfile";
// import StudentUpload from "./components/Student Dashboard/StudentUpload";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}></Route>

      <Route path="/register" element={<RegisterLayout />}>
        <Route path="student" element={<Student />} />
        <Route path="professor" element={<Professor />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Main />} />
        <Route path="sections" element={<Sections />} />
        <Route path="sections/:name" element={<Section />} />
        <Route path="sections/:name/:subject_name" element={<Subject />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/student-dashboard" element={<StudentDashboardLayout />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
