import Box from "@mui/material/Box";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const Setting = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "3rem" }}>
          <h1>Setting</h1>
        </Box>
      </Box>
    </>
  );
};

export default Setting;
