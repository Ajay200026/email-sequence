import React, { useState } from "react";
import ReactFlow, { Controls, MiniMap, addEdge } from "react-flow-renderer";

const EmailFlow = () => {
  const [elements, setElements] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleAddEmail = () => {
    if (newEmail.trim() !== "") {
      const newNode = {
        id: Date.now().toString(),
        data: { label: newEmail },
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      };

      setElements((prevElements) => [...prevElements, newNode]);
      setNewEmail("");
    }
  };

  const handleDeleteEmail = () => {
    if (selectedEmail) {
      setElements((prevElements) =>
        prevElements.filter((el) => el.id !== selectedEmail)
      );
      setSelectedEmail(null);
    }
  };

  const handleUpdateEmail = () => {
    if (selectedEmail && newEmail.trim() !== "") {
      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === selectedEmail ? { ...el, data: { label: newEmail } } : el
        )
      );
      setSelectedEmail(null);
      setNewEmail("");
    }
  };

  const onSelectionChange = (elements) => {
    // Here, you can handle the selection change event
    if (elements.length === 1) {
      setSelectedEmail(elements[0].id);
      setNewEmail(elements[0].data.label);
    } else {
      setSelectedEmail(null);
      setNewEmail("");
    }
  };

  const onConnect = (params) =>
    setElements((prevElements) => addEdge(params, prevElements));

  return (
    <div style={{ height: "80vh", width: "100%", position: "relative" }}>
      <ReactFlow
        elements={elements}
        onSelectionChange={onSelectionChange}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        connectionLineType="smoothstep"
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>

      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <label>Add Email:</label>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button onClick={handleAddEmail}>Add</button>
        <button onClick={handleUpdateEmail} disabled={!selectedEmail}>
          Update
        </button>
        <button onClick={handleDeleteEmail} disabled={!selectedEmail}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmailFlow;
