import { useEffect, useState } from "react";
import axios from "axios";

function UpdateUserForm() {
  const [user, setUser] = useState(null);
  const [roles, setroles] = useState([]);
  const [profileName, setProfileName] = useState("");

  const getRoles = () => {
    axios.get("http://localhost:4000/role/get").then((res) => {
      //console.log(res.data.data)
      setroles(res.data.data);
    });
  };

  const [image, setImage] = useState("");

 

  useEffect(() => {
    const getLoggedinUserData = () => {
      var id = localStorage.getItem("_id");
      axios
        .get("http://localhost:4000/user/user/" + id)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLoggedinUserData();
    getRoles();
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
    profile: null,
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        email: user.email,
        password: "",
        profile: user.profile,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setFormData({ ...formData, profile: event.target.files[0] });
    setProfileName(file.name);
    
   

    reader.onloadend = () => {
      // Set the state with the base64 string
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = localStorage.getItem("_id");
    console.log("---id---", id);
    const { firstname, email, password, profile, role } = formData;
    console.log("form data", formData);

    const data = {
      firstname,
      email,
      password,
      profile:image,
      role,
    };
    // data.append("firstname", firstname);
    // data.append("email", email);
    // data.append("password", password);
    // data.append("profile", profile);
    // data.append("role", role);
    console.log("Updated Data is", data);

    axios
      .put(`http://localhost:4000/user/user/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        // Handle success
      })
      .catch((err) => {
        console.error(err);
        // Handle error
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Firstname:
    //     <input
    //       type="text"
    //       name="firstname"
    //       value={formData.firstname}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     Email:
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     Password:
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     Profile Picture:
    //     <input type="file" name="profile" onChange={handleFileChange} />
    //     {profileName && <div>{profileName}</div>}
    //   </label>
    //   <label>
    //     Role:
    //     <select name="role" value={formData.role} onChange={handleChange}>
    //       <option value="">-- Select Role --</option>
    //       {roles.map((role) => (
    //         <option key={role._id} value={role._id}>
    //           {role.rolename}
    //         </option>
    //       ))}
    //     </select>
    //   </label>
    //   <button type="submit">Update User</button>
    // </form>
    <div className="container-fluid px-2 px-md-4">
      <div
        className="page-header min-height-150 border-radius-xl mt-2"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <span className="mask  bg-gradient-primary  opacity-6" />
      </div>
      <div className="card card-body mx-3 mx-md-4 mt-n6">
        <form onSubmit={handleSubmit}>
          <div className="row gx-4 mb-2">
            <div className="col-auto">
              <div className="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/bruce-mars.jpg"
                  alt="profile_image"
                  className="w-100 border-radius-lg shadow-sm"
                />
              </div>
            </div>
            <div className="col-auto my-auto">
              <div class="mb-3">
                <label class="form-label">Profile Picture:</label>
                <input
                  type="file"
                  class="form-control"
                  name="profile"
                  onChange={handleFileChange}
                />
                {profileName && <div>{profileName}</div>}
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Firstname:</label>
            <input
              type="text"
              class="form-control"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email:</label>
            <input
              type="email"
              class="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password:</label>
            <input
              type="password"
              class="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Role:</label>
            <select
              class="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">-- Select Role --</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.rolename}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            style={{ maxWidth: "150px", marginRight: "-10px" }}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserForm;
