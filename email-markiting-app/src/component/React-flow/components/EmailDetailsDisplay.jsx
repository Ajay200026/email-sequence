import React from "react";

const EmailDetailsDisplay = ({ emailId, subject, body }) => {
  return (
    <div className="flex flex-col font-extrabold">
      <label>Email ID:</label>
      <div className="text-display text-[11px]">{emailId}</div>
      <label>Subject:</label>
      <div className="text-display text-[11px]">{subject}</div>
      <label>Body:</label>
      <div className="text-display text-[11px]">{body}</div>
    </div>
  );
};

export default EmailDetailsDisplay;
