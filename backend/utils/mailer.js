const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",
    pass: "APP_PASSWORD"
  }
});

module.exports = function sendMail(to, subject, text) {
  transporter.sendMail({ from: "Blood Donation App", to, subject, text });
};
