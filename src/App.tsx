import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/admin";
import Login from "./components/login";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
