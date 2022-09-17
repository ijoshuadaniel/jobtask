import React, { useState, useContext } from "react";
import { AppContext } from "../../context/appcontext";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/api";
import "./index.scss";

const Login = () => {
  const { setuser } = useContext(AppContext);
  const navigate = useNavigate();
  const { loading, getMethod } = useApi();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      setMsg("");
      const res = await getMethod("v2/users");
      const isUser = res.data.find((f: any) => f.email === email);
      if (isUser) {
        const user = isUser;
        if (password === "admin") {
          user.type = "admin";
        } else {
          user.type = "employee";
        }
        setuser(user);
        navigate("/admin");
      } else {
        setMsg("User dosen`t exist");
      }
    } else {
      setMsg("All fields are required.");
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2 className="login-head">Login to HRM</h2>
        <p className={msg !== "" ? "message" : ""}>{msg}</p>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
