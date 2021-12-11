import nodemailer from "nodemailer";
import { PENDING } from "../constants/status.js";
import Confession from "../models/Confession.js";

const getPendingConfessions = async () => {
  let pendingConfessions = 0;
  try {
    pendingConfessions = await Confession.countDocuments({ status: PENDING });
  } catch (error) {
    console.error(error);
  }
  return pendingConfessions;
};

export const sendEmail = async () => {
  const pendingConfessions = await getPendingConfessions();
  if (pendingConfessions == 0) return;

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAILTO,
    subject: "New Confession(s)!",
    text: `You have ${pendingConfessions} new confession(s) to review.`,
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
