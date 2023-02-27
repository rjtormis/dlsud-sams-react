import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import Classroom from "./pages/Classroom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}></Route>
      <Route path="register/:type" element={<Register />} />
      <Route path="login" element={<Login />} />
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
