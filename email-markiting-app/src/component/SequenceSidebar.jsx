// SequenceSidebar.js
import React, { useState } from "react";

const SequenceSidebar = ({ onCreateSequence }) => {
  const [openModal, setOpenModal] = useState(false);
  const [sequenceName, setSequenceName] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateSequence = () => {
    onCreateSequence(sequenceName);
    setOpenModal(false);
  };

  return (
    <>
      <button
        className=" bg-purple-500 w-[200px] ml-7 mt-[5rem] hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Create Sequence
      </button>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Sequence</h2>
            <label htmlFor="sequenceName" className="block mb-2">
              Sequence Name:
            </label>
            <input
              type="text"
              id="sequenceName"
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCreateSequence}
                className=" bg-purple-500 w-[100px] text-white px-4 py-2 mr-2 rounded"
              >
                Create
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SequenceSidebar;
