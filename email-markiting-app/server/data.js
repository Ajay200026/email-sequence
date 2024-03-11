const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema
const emailSchema = new mongoose.Schema({
  emailId: String,
  subject: String,
  body: String,
});

const EmailModel = mongoose.model("Email", emailSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.post("/api/saveEmail", async (req, res) => {
  try {
    const { emailId, subject, body } = req.body;

    const newEmail = new EmailModel({
      emailId,
      subject,
      body,
    });

    const savedEmail = await newEmail.save();
    res.json(savedEmail);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
