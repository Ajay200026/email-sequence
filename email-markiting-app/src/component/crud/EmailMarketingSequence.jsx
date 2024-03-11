import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const EmailMarketingSequence = () => {
  const [emails, setEmails] = useState([]);
  const [showLetter, setShowLetter] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState("wait");
  const [selectedEmail, setSelectedEmail] = useState({
    _id: "",
    email: "",
    subject: "",
    content: "",
    date: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleShowLetter = () => {
    setShowLetter(true);
    setCurrentStep("wait");
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/emails")
      .then((response) => response.json())
      .then((data) => setEmails(data))
      .catch((error) => console.error("Error fetching emails:", error));
  }, []);

  const handleOpenDialog = (email) => {
    setSelectedEmail(email);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
      const apiUrl = selectedEmail._id
        ? `http://localhost:3000/api/emails/${selectedEmail._id}`
        : "http://localhost:3000/api/emails";

      // Omit _id when creating a new email
      const requestBody = selectedEmail._id
        ? selectedEmail
        : { ...selectedEmail, _id: undefined };

      const response = await fetch(apiUrl, {
        method: selectedEmail._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Email updated successfully!");
        setSnackbarMessage(
          selectedEmail._id
            ? "Email updated successfully!"
            : "Email added successfully!"
        );
        setOpenSnackbar(true);
        handleCloseDialog();
        fetch("http://localhost:3000/api/emails")
          .then((response) => response.json())
          .then((data) => setEmails(data))
          .catch((error) => console.error("Error fetching emails:", error));
      } else {
        console.error("Failed to update email:", response.status);
        console.error(
          selectedEmail._id ? "Failed to update email" : "Failed to save email"
        );
        setSnackbarMessage(
          selectedEmail._id
            ? "Failed to update email. Please try again."
            : "Failed to add email. Please try again."
        );
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/emails/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Email deleted successfully!");
        setSnackbarMessage("Email deleted successfully!");
        setOpenSnackbar(true);
        fetch("http://localhost:3000/api/emails")
          .then((response) => response.json())
          .then((data) => setEmails(data))
          .catch((error) => console.error("Error fetching emails:", error));
      } else {
        console.error("Failed to delete email:", response.status);
        setSnackbarMessage("Failed to delete email. Please try again.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="w-[1050px]">
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          handleOpenDialog({
            _id: "",
            email: "",
            subject: "",
            content: "",
            date: "",
          })
        }
      >
        Add Email
      </Button>

      <TableContainer className="mt-8" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email._id}>
                <TableCell>{email.email}</TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell>{email.content}</TableCell>
                <TableCell>{email.date}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(email)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(email._id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedEmail._id === "" ? "Add Email" : "Edit Email"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Email ID"
            value={selectedEmail.email}
            onChange={(e) =>
              setSelectedEmail({ ...selectedEmail, email: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Subject"
            value={selectedEmail.subject}
            onChange={(e) =>
              setSelectedEmail({ ...selectedEmail, subject: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Content"
            value={selectedEmail.content}
            onChange={(e) =>
              setSelectedEmail({ ...selectedEmail, content: e.target.value })
            }
            fullWidth
            multiline
          />
          <TextField
            label="Date"
            type="date"
            value={selectedEmail.date}
            onChange={(e) =>
              setSelectedEmail({ ...selectedEmail, date: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default EmailMarketingSequence;
