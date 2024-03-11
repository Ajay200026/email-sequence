import Box from "@mui/material/Box";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const HelpCenter = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "3rem" }}>
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">
              Email Marketing Help Center
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
                <p>
                  Learn the basics of setting up your email marketing campaigns.
                </p>
              </div>

              <div className="p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-2">
                  Campaign Optimization
                </h2>
                <p>
                  Tips and tricks to optimize your email marketing campaigns for
                  better results.
                </p>
              </div>

              <div className="p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-2">Troubleshooting</h2>
                <p>
                  Common issues and solutions to troubleshoot problems in your
                  email sequences.
                </p>
              </div>

              {/* Add more sections as needed */}
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default HelpCenter;
