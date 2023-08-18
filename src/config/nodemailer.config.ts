import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function membershipEmail() {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: "ClientEmail",
    subject: "Membership",
    text: "Welcome abroad!",
    html: "<b>Welcome abroad!</b>",
  });
}

export async function accountSuspended() {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: "ClientEmail",
    subject: "Membership",
    text: "Welcome abroad!",
    html: "<b>Welcome abroad!</b>",
  });
}

