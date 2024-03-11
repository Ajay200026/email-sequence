const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { ObjectId } = mongoose.Types;

const emailSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  subject: String,
  content: String,
  date: String,
});

const Email = mongoose.model("Email", emailSchema);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/api/emails", async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/emails", async (req, res) => {
  try {
    const newEmail = new Email({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    });

    await newEmail.save();
    res.status(201).json({ message: "Email saved successfully" });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Invalid data. Please check your input." });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.put("/api/emails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmail = await Email.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/emails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const objectId = new ObjectId(id);
    await Email.findByIdAndDelete(objectId);

    res.status(200).json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
