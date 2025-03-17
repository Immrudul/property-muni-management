import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth?.token) {
    navigate("/login"); 
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Welcome!
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/municipalities")}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Take me to Municipalities!
          </button>
          <button
            onClick={() => navigate("/properties")}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Take me to Properties!
          </button>
          <button
            onClick={auth.logout}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
