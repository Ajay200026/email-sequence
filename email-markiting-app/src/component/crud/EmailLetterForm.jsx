import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const EmailCard = ({ entry, index, moveCard }) => {
  const [, drag] = useDrag({
    type: "CARD",
    item: { index },
  });

  return (
    <div ref={drag}>
      <Card
        key={entry._id}
        style={{ marginTop: "16px", backgroundColor: "white" }}
      >
        <CardContent>
          <Typography variant="body1">
            <strong>Email ID:</strong> {entry.email}
          </Typography>
          <Typography variant="body1">
            <strong>Subject:</strong> {entry.subject}
          </Typography>
          <Typography variant="body1">
            <strong>Content:</strong> {entry.content}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {entry.date}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const DroppedItem = ({ type }) => {
  return (
    <Card style={{ marginTop: "16px", backgroundColor: "white" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {type}
        </Typography>
        <Typography variant="body1">
          {type === "Decision"
            ? "Add your decision details here."
            : "Add your send details here."}
        </Typography>
      </CardContent>
    </Card>
  );
};

const EmailLetterForm = ({ emailDetails }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, [emailDetails]);

  const fetchEntries = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/emails");
      const data = await response.json();
      setEntries(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const moveCard = (fromIndex, toIndex) => {
    const updatedEntries = [...entries];
    const [movedCard] = updatedEntries.splice(fromIndex, 1);
    updatedEntries.splice(toIndex, 0, movedCard);
    setEntries(updatedEntries);
  };

  const [, dropDecision] = useDrop({
    accept: "CARD",
    drop: () => handleDropInBlock("Decision"),
  });

  const [, dropSend] = useDrop({
    accept: "CARD",
    drop: () => handleDropInBlock("Send"),
  });

  const handleDropInBlock = (type) => {
    console.log(`Dropped into ${type} block`);
  };

  return (
    <div>
      <Card style={{ marginTop: "16px", backgroundColor: "white" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Wait
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {entries.map((entry, index) => (
                <EmailCard
                  key={index}
                  entry={entry}
                  index={index}
                  moveCard={moveCard}
                />
              ))}
            </>
          )}
        </CardContent>
      </Card>

      <div
        ref={dropDecision}
        style={{
          marginTop: "16px",
          minHeight: "100px",
          border: "1px dashed #ccc",
        }}
      >
        <DroppedItem type="Decision" />
      </div>

      <div
        ref={dropSend}
        style={{
          marginTop: "16px",
          minHeight: "100px",
          border: "1px dashed #ccc",
        }}
      >
        <DroppedItem type="Send" />
      </div>
    </div>
  );
};

export default EmailLetterForm;
