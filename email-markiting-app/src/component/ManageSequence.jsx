import Box from "@mui/material/Box";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const ManageSequence = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "3rem" }}>
          <h1>Setting</h1>
          <div
            style={{
              height: "500px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          ></div>
        </Box>
      </Box>
    </>
  );
};

export default ManageSequence;
