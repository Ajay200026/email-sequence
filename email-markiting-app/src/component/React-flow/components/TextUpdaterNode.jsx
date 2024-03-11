import axios from "axios";
import { useCallback, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdAssignmentAdd, MdDelete } from "react-icons/md";
function TextUpdaterNode({ data, isConnectable }) {
  const initialNode = {
    id: 1,
    emailId: "",
    subject: "",
    body: "",
  };

  const [nodes, setNodes] = useState([initialNode]);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmailSequence, setNewEmailSequence] = useState({
    emailId: "",
    subject: "",
    body: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const serverBaseUrl = "http://localhost:8000";

  const onChange = useCallback(
    (evt, nodeId) => {
      // Update the email details of the specific node
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                emailId: newEmailSequence.emailId,
                subject: newEmailSequence.subject,
                body: newEmailSequence.body,
              }
            : node
        )
      );
    },
    [newEmailSequence]
  );

  const addNewNode = () => {
    // Create a copy of the initial node
    const newNode = { ...initialNode, id: nodes.length + 1 };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const deleteNode = (nodeId) => {
    // Remove the node with the specified ID
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  };

  const startEditingNode = (nodeId) => {
    setEditingNodeId(nodeId);
    const selectedNode = nodes.find((node) => node.id === nodeId);
    setNewEmailSequence({
      emailId: selectedNode.emailId,
      subject: selectedNode.subject,
      body: selectedNode.body,
    });
    setShowAddModal(true);
    setIsEditMode(true);
  };

  const finishEditingNode = () => {
    setEditingNodeId(null);
    setNewEmailSequence({ emailId: "", subject: "", body: "" });
  };

  const openAddModal = (nodeId) => {
    setShowAddModal(true);
    setSelectedNodeId(nodeId);
    setIsEditMode(false);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setSelectedNodeId(null);
    setNewEmailSequence({ emailId: "", subject: "", body: "" });
  };

  const submitAddModal = async () => {
    try {
      console.log("Email Sequence Details:", newEmailSequence);

      const response = await axios.post(
        `${serverBaseUrl}/api/saveEmail`,
        newEmailSequence
      );

      console.log("Saved to MongoDB:", response.data);

      if (editingNodeId) {
        // If editing, update the existing node
        onChange(null, editingNodeId);
        finishEditingNode();
      } else {
        // If adding, update the selected node
        onChange(null, selectedNodeId);
        closeAddModal();
      }
    } catch (error) {
      console.error("Error saving to MongoDB:", error);
    }
  };

  return (
    <div className="relative">
      {/* Render existing nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`text-updater-node mt-4 bg-gray-200 w-[200px] h-[140px] px-2  ${
            editingNodeId === node.id ? "editing" : ""
          }`}
        >
          <div>
            <div className="flex justify-between flex-row-reverse mb-2  pt-1">
              <button
                onClick={() => deleteNode(node.id)}
                className="delete-btn"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => startEditingNode(node.id)}
                className="edit-btn"
              >
                <FaEdit />
              </button>
              <button onClick={() => openAddModal(node.id)} className="add-btn">
                <MdAssignmentAdd />
              </button>
            </div>
            <div className=" flex flex-col font-extrabold overflow-scroll">
              <label htmlFor={`text-${node.id}`}>Email ID:</label>
              <div className="text-display text-[11px]">{node.emailId}</div>
              <label htmlFor={`text-${node.id}`}>Subject:</label>
              <div className="text-display  text-[11px]">{node.subject}</div>
              <label htmlFor={`text-${node.id}`}>Body:</label>
              <div className="text-display  text-[11px]">{node.body}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Connecting Line */}
      <div className="border solid w-[5px] h-[50px] flex justify-center ml-[6.5rem] bg-black top-0"></div>

      {/* Handle and Icon */}
      <div className="absolute  top-full left-1/2 transform -translate-x-1/2  flex items-center justify-center">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-2xl flex mt-[0px]">
            <button onClick={addNewNode}>+</button>
          </span>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-[335px] h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-[1.4rem] font-bold mb-4">
              {editingNodeId ? "Edit" : "Add"} Email Sequence Details
            </h2>
            <label htmlFor="emailId" className="block mb-2">
              Email ID:
            </label>
            <input
              type="text"
              id="emailId"
              value={newEmailSequence.emailId}
              onChange={(e) =>
                setNewEmailSequence({
                  ...newEmailSequence,
                  emailId: e.target.value,
                })
              }
              className="w-full p-2 mb-4 border rounded"
            />
            <label htmlFor="subject" className="block mb-2">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              value={newEmailSequence.subject}
              onChange={(e) =>
                setNewEmailSequence({
                  ...newEmailSequence,
                  subject: e.target.value,
                })
              }
              className="w-full p-2 mb-4 border rounded"
            />
            <label htmlFor="body" className="block mb-2">
              Body:
            </label>
            <textarea
              id="body"
              value={newEmailSequence.body}
              onChange={(e) =>
                setNewEmailSequence({
                  ...newEmailSequence,
                  body: e.target.value,
                })
              }
              className="w-full p-2 mb-4 border rounded"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  submitAddModal();
                  closeAddModal();
                }}
                className="bg-green-400 text-white px-4 py-2 mr-2 rounded"
              >
                {isEditMode ? "Update" : "Submit"}
              </button>
              <button
                onClick={closeAddModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextUpdaterNode;
