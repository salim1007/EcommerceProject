import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <p>I am Home Page</p>
        <Link to="/footer" >Footers</Link>
      </div>
    </div>
  );
};

export default Home;
