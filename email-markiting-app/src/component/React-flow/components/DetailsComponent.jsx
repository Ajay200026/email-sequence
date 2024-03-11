import React from "react";

const DetailsComponent = ({ details, onHover }) => {
  // Check if details is defined before using map
  if (!details) {
    return null; // or handle the case when details is undefined
  }

  return (
    <div className="details-component" onMouseEnter={onHover}>
      <h2>Details Component</h2>
      {details.map((email, index) => (
        <div key={index}>
          <p>
            <strong>Email ID:</strong> {email.emailId}
            <br />
            <strong>Subject:</strong> {email.subject}
            <br />
            <strong>Body:</strong> {email.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DetailsComponent;
