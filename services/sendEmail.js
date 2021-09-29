const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  console.log("options", options);
  console.log("host", process.env.SMTP_HOST);
  console.log("options", process.env.SMTP_PORT);
  console.log("options", process.env.SMTP_EMAIL);
  console.log("options", process.env.SMTP_PASSWORD);

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const info = await transporter.sendMail(message);
  console.log("EMAIL HAS BEEN SENT SUCCESSFULLY", info.messageId);
};

module.exports = sendMail;
