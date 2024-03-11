import React, { useEffect, useState } from "react";

const MainBlock = () => {
  const [emails, setEmails] = useState([]);
  const [decisionEmail, setDecisionEmail] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const [showSendBlock, setShowSendBlock] = useState(false);

  const fetchData = () => {
    fetch("http://localhost:3000/api/emails")
      .then((response) => response.json())
      .then((data) => setEmails(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDecision = async (decision) => {
    try {
      // Send the email to the provided email address
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: decisionEmail.email,
          subject: decisionEmail.subject,
          content: decisionEmail.content,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully!");
      } else {
        console.error("Error sending email:", response.statusText);
        alert("Error sending email. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email. Please try again later.");
    }

    setShowSendBlock(true);
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (emails.length > 0 && decisionEmail === null) {
      const timeoutId = setTimeout(() => {
        setDecisionEmail(emails[0]); // Move the first email to the decision block
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [emails, decisionEmail]);

  useEffect(() => {
    // Clear wait block after sending email to decision block
    if (decisionEmail !== null && !sentEmails.includes(decisionEmail)) {
      setSentEmails((prevSentEmails) => [...prevSentEmails, decisionEmail]);
    }
  }, [decisionEmail]);

  return (
    <div>
      <div className="flex justify-center mt-[1rem] mb-[1rem] gap-x-10">
        <div className="border w-[300px] h-[250px] bg-gray-100 overflow-y-auto px-4 no-scrollbar rounded-md">
          <h2 className=" text-center font-extrabold py-4">wait block</h2>
          <ul>
            {emails
              .filter(
                (email) =>
                  !sentEmails.some((sentEmail) => sentEmail._id === email._id)
              )
              .map((email) => (
                <li
                  className="flex flex-col border px-3 py-3 bg-slate-400 rounded-md mb-4"
                  key={email._id}
                >
                  <strong>{email.subject}</strong>
                  <strong>{email.content}</strong>
                  <strong>{email.email}</strong>
                </li>
              ))}
          </ul>
        </div>
        <div className="border w-[300px] h-[250px] bg-gray-100 px-4 py-4 rounded-md ">
          <h2 className=" text-center font-extrabold">decision block</h2>
          {decisionEmail && (
            <div className="flex flex-col border px-3 py-3 bg-slate-400 rounded-md mb-4">
              <ul className="flex flex-col border px-3 py-3 bg-slate-400 rounded-md mb-4">
                <strong>{decisionEmail.subject}</strong>
                <strong>{decisionEmail.content}</strong>
                <strong>{decisionEmail.email}</strong>
              </ul>
              <div>
                <button
                  onClick={() => handleDecision("Accept")}
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision("Reject")}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
        {sentEmails.length > 0 && showSendBlock && (
          <div className="border w-[300px] h-[250px] bg-green-200 px-4 overflow-y-auto py-4 no-scrollbar rounded-md ">
            <h2 className=" text-center font-extrabold">Send Block</h2>
            <div className="flex flex-col border px-3 py-3 bg-slate-400 rounded-md mb-4">
              {sentEmails.map((email) => (
                <div
                  key={email._id}
                  className="flex flex-col border px-3 py-3 bg-slate-400 rounded-md mb-4"
                >
                  <strong>{email.subject}</strong>
                  <strong>{email.content}</strong>
                  <strong>{email.email}</strong>
                  <p>Mail Sent!</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBlock;
