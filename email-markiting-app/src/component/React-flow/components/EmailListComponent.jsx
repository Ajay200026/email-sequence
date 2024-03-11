import React, { useEffect, useState } from "react";

const EmailListComponent = ({ onSelectEmail }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    // Fetch email data from API
    const fetchEmails = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/emails");
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    fetchEmails();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchEmails, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Fetch emails once on mount

  const sendEmail = async () => {
    if (emails.length > 0) {
      const [currentEmail, ...remainingEmails] = emails;
      onSelectEmail(currentEmail);
      setSelectedEmail(currentEmail);

      // Update the state to remove the sent email
      setEmails(remainingEmails);
    }
  };

  const handleSendClick = () => {
    setWaiting(false);
    sendEmail();
  };

  const handleWaitClick = () => {
    setWaiting(true);
  };

  return (
    <div className=" w-[280px] h-[270px] mx-auto p-4 border  bg-gray-100 overflow-y-auto no-scrollbar rounded-md ">
      <h2 className="text-xl font-bold mb-4">Waite block</h2>
      <div className="mb-4">
        <button
          className="mr-4 w-[100px] h-[30px] bg-purple-600 text-white px-4 py-2 rounded"
          onClick={handleSendClick}
        >
          Send
        </button>
        <button
          className=" w-[100px] h-[30px] bg-gray-400 text-white px-4 py-2 rounded"
          onClick={handleWaitClick}
        >
          Wait
        </button>
      </div>
      <ul>
        {waiting && (
          <div className="text-center my-4">
            <p className="text-gray-700">Waiting for the next email...</p>
            <div className="loader"></div>
          </div>
        )}
        {emails.map((email) => (
          <li
            key={email.emailId}
            className={`mb-4 p-4 border rounded ${
              selectedEmail === email ? "bg-gray-300" : ""
            }`}
          >
            <strong className="block text-lg mb-2">{email.subject}</strong>
            <p className="text-gray-700">{email.body}</p>
            <p className="text-sm text-gray-500 mt-2">
              Email ID: {email.emailId}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailListComponent;
