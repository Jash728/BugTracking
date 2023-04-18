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
import ShowDevTasks from "./components/pages/ShowDevTasks";
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
        <Route path="/" element={<UserReg />} />
        <Route path="/userreg" element={<UserReg />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/manager" element={<ManagerDashboard/>}/>
        <Route path="/developer" element={<DeveloperDashboard/>}/>
        <Route path="/projectdetails" element={<ProjectDetails/>}/>
        <Route path="/moduledetails" element={<ModuleDetails/>}/>
        <Route path="/tasks" element={<ShowDevTasks/>}/>
        <Route path="/logout" element={<UserLogin/>}/>
      </Routes>
    </div>
  );
}


export default App;
