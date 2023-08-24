import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});

const mailgunDomain = process.env.MAILGUN_DOMAIN || "";

export const sendEmailVerificationLink = async (
  token: string,
  email: string,
) => {
  try {
    const log = await mg.messages.create(mailgunDomain, {
      from: `Mailgun Sandbox <mailgun@${mailgunDomain}>`,
      to: [email],
      subject: "Share Links - Email Verification",
      template: "email  verification",
      "h:X-Mailgun-Variables": JSON.stringify({
        url:
          process.env.NODE_ENV === "development"
            ? `http://localhost:3000/email-verification/${token}`
            : `https://share-links.vercel.app/auth/email-verification/${token}`,
      }),
    });
    return log.message;
  } catch (error) {
    throw new Error("Error sending email verification link", {
      cause: "MAILGUN_ERROR",
    });
  }
};
