import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-0">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
