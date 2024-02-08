import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "movsisyan.garik2006@gmail.com",
    pass: "pcre jrar npkf mksk"
  }
});

export async function sendEmail(toEmail: string, title: string, text: string) {
  const mailOptions = {
    from: "movsisyan.garik2006@gmail.com",
    to: toEmail,
    subject: title,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw "Something went wrong, the code was not sent";
  }
}
