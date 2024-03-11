import React from "react";
import ReactFlow from "react-flow-renderer";

const elements = [
  // Define your flowchart elements here
  {
    id: "1",
    type: "start",
    data: { label: "Start" },
    position: { x: 50, y: 100 },
  },
  { id: "2", data: { label: "Email 1" }, position: { x: 200, y: 100 } },
  { id: "3", data: { label: "Email 2" }, position: { x: 200, y: 200 } },
  {
    id: "4",
    type: "end",
    data: { label: "End" },
    position: { x: 400, y: 150 },
  },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
];

const EmailFlowChart = () => {
  return <ReactFlow elements={elements} style={{ height: "500px" }} />;
};

export default EmailFlowChart;
