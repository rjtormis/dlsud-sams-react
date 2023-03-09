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
import AllSection from "./pages/Dashboard/AllSection";
import Student from "./pages/Register/Student";
import Professor from "./pages/Register/Professor";
import NotFound from "./pages/NotFound";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import SpecificSection from "./pages/Dashboard/SpecificSection";
import Subject from "./pages/Dashboard/Subject";

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
        <Route path="sections" element={<AllSection />} />
        <Route path="sections/:name" element={<SpecificSection />} />
        <Route path="sections/:name/:subject_name" element={<Subject />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
