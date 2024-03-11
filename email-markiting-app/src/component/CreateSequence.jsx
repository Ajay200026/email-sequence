// CreateSequence.js
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Container from "./Container";
import Navbar from "./Navbar";
import SequenceSidebar from "./SequenceSidebar";
import Sidebar from "./Sidebar";

const CreateSequence = () => {
  const [sequences, setSequences] = useState([]);
  const [currentSequence, setCurrentSequence] = useState(null);

  const handleCreateSequence = (sequenceName) => {
    const newSequences = [...sequences, sequenceName];
    setSequences(newSequences);
    setCurrentSequence(sequenceName);
  };

  return (
    <>
      <Navbar currentSequence={currentSequence} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <div className="  w-[100%] h-[100vh] bg-[url('/pattern.png')]">
          <SequenceSidebar onCreateSequence={handleCreateSequence} />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "3rem" }}>
            {sequences.map((sequence) => (
              <Container key={sequence} sequenceName={sequence} />
            ))}
          </Box>
        </div>
      </Box>
    </>
  );
};

export default CreateSequence;
