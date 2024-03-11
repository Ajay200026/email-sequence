const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fakeblinkscam@gmail.com",
    pass: "pvyu yxuq efbz jjnt",
  },
});

const openedEmails = [];

app.get("/track-email-opened", (req, res) => {
  const emailId = req.query.emailId;

  console.log(`Email with ID ${emailId} has been opened.`);

  openedEmails.push(emailId);

  res.sendFile(__dirname + "/tracking-pixel.png");
});

app.post("/send-email", (req, res) => {
  try {
    const { to, subject, body } = req.body;

    const greeting = `
      Hello ${to},

      This is a greeting email. Thank you for using our service!

      Best regards,
      SalesBlink
    `;

    const mailOptions = {
      from: "fakeblinkscam@gmail.com",
      to,
      subject,
      text: `${greeting}\n\n${body}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Email sent:", info.response);
        res
          .status(200)
          .json({
            message: "Email sent successfully",
            emailId: info.messageId,
          });
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-opened-count", (req, res) => {
  res.status(200).json({ openedCount: openedEmails.length });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
