import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appcontext";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import useApi from "../../hooks/api";

const Admin = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { user, setuser } = useContext(AppContext);
  const { postMethod } = useApi();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "Male",
    status: "Active",
  });

  const handleLogout = () => {
    setuser({});
    navigate("/");
  };

  const setData = (e: any, n: string) => {
    const a: any = userData;
    a[n] = e.target.value;
    setUserData({ ...a });
  };

  const handleSave = async () => {
    if (userData.name !== "" && userData.email !== "") {
      const response = await postMethod("v2/users", userData);
      if (response && (response.status === 201 || response.status === 200)) {
        setMsg("User Created Successfully...");
        const timeout = setTimeout(() => {
          setMsg("");
          setUserData({
            name: "",
            email: "",
            gender: "Male",
            status: "Active",
          });
          clearTimeout(timeout);
        }, 3000);
      }
    } else {
      setMsg("All details is required");
    }
  };

  useEffect(() => {
    if (!user.type) {
      navigate("/");
    }
  }, []);

  return (
    <div className="admin">
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">ORANGE HRM</div>
        <div className="admin-sidebar-nav">
          <ul>
            <li>Admin</li>
            <li>Leave</li>
            <li className="active">PM</li>
            <li>Time</li>
          </ul>
          <ul>
            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-nav">
          <p>
            {user.name} - {user.email}
          </p>
        </div>
        <div className="admin-content-info">
          <p>
            {user.type && user.type === "admin" ? "Add User" : "User Details"}
          </p>
          <br />
          <div className="admin-content-card">
            <p className={msg !== "" ? "message" : ""}>{msg}</p>
            {user.type && user.type === "employee" && (
              <div className="admin-content-card-info">
                <div className="flex-d">
                  <label>Name</label>
                  <input type="text" disabled value={user.name} />
                </div>
                <div className="flex-d">
                  <label>Email</label>
                  <input type="text" disabled value={user.email} />
                </div>
                <div className="flex-d">
                  <label>Gender</label>
                  <input type="text" disabled value={user.gender} />
                </div>
                <div className="flex-d">
                  <label>Status</label>
                  <input type="text" disabled value={user.status} />
                </div>
                <div className="flex-d">
                  <label>Role</label>
                  <input type="text" disabled value={user.type} />
                </div>
              </div>
            )}
            {user.type && user.type === "admin" && (
              <div className="admin-content-card-info">
                <div className="flex-d">
                  <label>Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setData(e, "name")}
                  />
                </div>
                <div className="flex-d">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setData(e, "email")}
                  />
                </div>
                <div className="flex-d">
                  <label>Gender</label>
                  <select
                    value={userData.gender}
                    onChange={(e) => setData(e, "gender")}
                  >
                    <option value="male">Male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                <div className="flex-d">
                  <label>Status</label>
                  <select
                    value={userData.status}
                    onChange={(e) => setData(e, "status")}
                  >
                    <option value="Active">Active</option>
                  </select>
                </div>
                <div className="flex-d">
                  <button onClick={handleSave}>Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
