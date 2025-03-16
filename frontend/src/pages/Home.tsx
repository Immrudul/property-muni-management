import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth?.token) {
    navigate("/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Home Page!</h2>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};

export default Home;
