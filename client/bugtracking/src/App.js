import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserReg } from "./components/user/UserReg";
import { UserLogin } from "./components/user/UserLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerDashboard from "./components//dashboard/ManagerDashboard";
import ProjectDetails from "./components/pages/ProjectDetails";
import ModuleDetails from "./components/pages/ModuleDetails";
import DeveloperDashboard from "./components/dashboard/DeveloperDashboard";
import ShowDevTasks from "./components/pages//developer/ShowDevTasks";
import UpdateUserForm from "./components/pages/profile/UpdateUserForm";
import Profile from "./components/pages//profile/Profile";
import UpdateProfile from "./components/pages/profile/UpdateProfile";
import ProtectedRoutes from "./ProtectedRoutes";
import ShowStatus from "./components/pages/developer/ShowStatus";
// import {ProtectedRoute} from "./components/ProtectedRoute"

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* <UserReg/> */}

      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/userreg" element={<UserReg />} />
        <Route path="/login" element={<UserLogin />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/developer" element={<DeveloperDashboard />} />
          <Route path="/projectdetails" element={<ProjectDetails />} />
          <Route path="/moduledetails" element={<ModuleDetails />} />
          <Route path="/tasks" element={<ShowDevTasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/taskstatus" element={<ShowStatus />} />
          <Route path="/logout" element={<UserLogin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
