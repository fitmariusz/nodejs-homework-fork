const nodemailer = require("nodemailer");

const { M_USER, M_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: M_USER,
    pass: M_PASS,
  },
});

const email = async (html, subject, to) => {
  const info = await transporter.sendMail({
    from: "<biuro.locoway@gmail.com>", // sender address
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = {email};
