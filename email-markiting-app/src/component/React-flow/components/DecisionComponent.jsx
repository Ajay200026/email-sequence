import React from "react";

const DecisionComponent = ({
  selectedEmail,
  onAccept,
  onReject,
  isEmailAccepted,
}) => {
  const handleAccept = () => {
    onAccept(selectedEmail);
  };

  const handleReject = () => {
    onReject(selectedEmail);
  };

  return (
    <div className="w-[330px] h-[270px] mx-auto p-4 border rounded-md bg-gray-100 md:w-[280px]">
      <h2 className="text-xl font-bold mb-4">Decision block</h2>
      {selectedEmail ? (
        <div className="p-4 border rounded">
          <strong className="block text-lg mb-2">
            {selectedEmail.subject}
          </strong>
          <p className="text-gray-700">{selectedEmail.body}</p>
          <p className="text-sm text-gray-500 mt-2">
            Email ID: {selectedEmail.emailId}
          </p>

          {isEmailAccepted ? (
            <div className="mt-4">
              <p>Email accepted! Ready to send.</p>
            </div>
          ) : (
            <div className="mt-4 flex">
              <button
                onClick={handleAccept}
                className="bg-green-500 w-[90px] h-[30px] flex items-center justify-center text-white px-4 py-2 mr-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 w-[90px] h-[30px] flex items-center justify-center text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No email selected.</p>
      )}
    </div>
  );
};

export default DecisionComponent;
