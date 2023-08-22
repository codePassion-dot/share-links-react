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
      from: `Excited User <mailgun@${mailgunDomain}>`,
      to: [email],
      subject: `Hello this is your token ${token}`,
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>",
    });
    return log;
  } catch (error) {
    throw new Error("Error sending email verification link", {
      cause: "MAILGUN_ERROR",
    });
  }
};
