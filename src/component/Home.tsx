import React from "react";
import logo2 from "../assets/image/logo2.jpeg";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div className="HomePage">
        <img src={logo2} className="logo" alt="vite logo" />

        <h1>Welome to our Quiz App</h1>

        <button onClick={() => navigate("/register")}> Start now</button>
      </div>
    </div>
  );
};

export default Home;
