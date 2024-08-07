const { transporter } = require("../configs/nodeMailer.config");
const ejs = require("ejs");
const path = require("path");

exports.sentEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("Sent email data_", req.body);

  // Render the EJS template with the form data
  ejs.renderFile(
    path.join("views", "../templates/emailTemplate.ejs"),
    { name, email, subject, message },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to render email template" });
        return;
      }

      const mailOptions = {
        from: email,
        to: "recipient-email@example.com",
        subject: subject,
        html: data,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: "Failed to send email" });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send({ message: "Email sent successfully" });
        }
      });
    }
  );
};
