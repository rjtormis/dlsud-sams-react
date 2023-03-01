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
import Classroom from "./pages/Dashboard/Classroom";
import Student from "./pages/Register/Student";
import Professor from "./pages/Register/Professor";
import NotFound from "./pages/NotFound";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import RegisterLayout from "./layouts/RegisterLayout";

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
        <Route path="classroom" element={<Classroom />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
