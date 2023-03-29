import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserReg } from "./components/user/UserReg";
import { UserLogin } from "./components/user/UserLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DevDashboard from "./components//dashboard/DevDashboard";


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
        <Route path="/userreg" element={<UserReg />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/devdashboard" element={<DevDashboard/>}/>
        <Route path="/logout" element={<UserLogin/>}/>
      </Routes>
    </div>
  );
}


export default App;
