import React, { useState } from "react";
import DecisionComponent from "./DecisionComponent";
import EmailListComponent from "./EmailListComponent";
import SendComponent from "./SendComponent";

const ParentComponent = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isEmailAccepted, setIsEmailAccepted] = useState(false);
  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
  };

  const handleAccept = (email) => {
    // Implement logic to send email data to SendComponent
    console.log("Accepted:", email);

    // After sending, clear the selectedEmail state
    setIsEmailAccepted(true);
  };

  const handleReject = (email) => {
    // Implement logic to remove email from DecisionComponent
    console.log("Rejected:", email);

    // After rejecting, clear the selectedEmail state
    setSelectedEmail(null);
  };

  return (
    <div className=" grid grid-cols-2 gap-4 pl-2 pt-1 pr-3  md:flex md:flex-col md:mr-8 max-sm:flex max-sm:mt-[20rem] max-sm:flex-col">
      <div className="w-1/2">
        <EmailListComponent onSelectEmail={handleSelectEmail} />
      </div>
      <div className=" ">
        <DecisionComponent
          selectedEmail={selectedEmail}
          onAccept={handleAccept}
          onReject={handleReject}
          isEmailAccepted={isEmailAccepted}
        />
      </div>
      <div className="">
        {isEmailAccepted ? (
          <SendComponent email={selectedEmail} />
        ) : (
          <div className=" mx-auto p-4 mt-10 ">
            <p>No email accepted to send.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentComponent;
