import Box from "@mui/material/Box";
import React from "react";
import KanbanBoard from "./Drag/KanbanBoard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import EmailMarketingSequence from "./crud/EmailMarketingSequence";
import EmailTrackingStats from "./workflow/EmailTracking";
import MainBlock from "./workflow/MainBlock";
const DashBoard = () => {
  return (
    <div className="">
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "3rem" }}>
          <EmailTrackingStats />
          <MainBlock />
          <EmailMarketingSequence />
          <KanbanBoard />
        </Box>
      </Box>
    </div>
  );
};

export default DashBoard;
