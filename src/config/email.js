import nodemailer from "nodemailer";

export const createMailer = () => {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("MAIL_USER/MAIL_APP_PASSWORD error");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false, 
    },
  });
};
