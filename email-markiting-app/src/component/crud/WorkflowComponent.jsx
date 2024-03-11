import React from "react";

const WorkflowComponent = ({ waitData }) => {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        width: "30%",
      }}
    >
      <h2>Wait</h2>
      {/* Render details dynamically for the "Wait" block */}
      <p>Name: {waitData.name}</p>
      <p>Email: {waitData.email}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default WorkflowComponent;
