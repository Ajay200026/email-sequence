import React, { useEffect, useState } from "react";
const SendComponent = ({ email }) => {
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (email && !isSent && !isSending) {
      setIsSending(true);

      // Make a POST request to the server to send the email
      fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email.emailId,
          subject: email.subject,
          body: email.body,
        }),
      })
        .then(async (response) => {
          const responseData = await response.text();

          if (!response.ok) {
            throw new Error(`Error sending email: ${responseData}`);
          }

          return responseData;
        })
        .then((data) => {
          console.log(data);
          setIsSent(true);
          setIsSending(false);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          setIsSending(false);
        });
    }
  }, [email, isSent, isSending]);

  return (
    <div className=" w-[300px] h-[250] mx-auto p-4 bg-gray-100 border rounded-md">
      <h2 className="text-xl font-bold mb-4">Send block</h2>
      {email ? (
        <div className="p-4 border rounded">
          <strong className="block text-lg mb-2">{email.subject}</strong>
          <p className="text-gray-700">{email.body}</p>
          <p className="text-sm text-gray-500 mt-2">
            Email ID: {email.emailId}
          </p>

          {isSending ? (
            <div className="mt-4">
              <p>Sending email...</p>
              <div className="loader"></div>
            </div>
          ) : (
            isSent && (
              <div className="mt-4">
                <p>Email sent successfully!</p>
              </div>
            )
          )}
        </div>
      ) : (
        <p>No email selected to send.</p>
      )}
    </div>
  );
};

export default SendComponent;
