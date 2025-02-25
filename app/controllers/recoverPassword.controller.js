import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import connectiondb from "../database/database.js";

async function sendEmail(req,res) {
    const email = req.body.email;
    try {
        const passwordUser = await getUserByEmail(email);
        if (!passwordUser) {
          return res.status(404).send("Error, user doesn't exist.");
      }

      const newPassword = generateRandomPassword(10);
      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      await updateUserPassword(email, hashedPassword);
      let info = await sendTwoEmail(email, "Recover password APP-Login", `Hello, we are contanting the login app support team. To recover your password you have been assigned the following: ${newPassword}. You can change it in the security section of the platform.`);
      res.status(200).send(`Email sent: ${info.message}`);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error sending email");
  }
}



async function sendTwoEmail(to, subject, text) {
    const userGmail = "kjulianapena1314@gmail.com";
    const passAppGmail = "wtgb sdzm ceum gqfz";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userGmail,
      pass: passAppGmail,
    },
  });

  const mailOptions = {
    from: userGmail,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { status: "ok", message: "Email sent successfully", info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { status: "error", message: "Failed to send email", error };
  }
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT password_hash FROM users WHERE LOWER(email_user) = LOWER(?)";
    connectiondb.query(query, [email], (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result[0]);
    });
  });
}

function updateUserPassword(email, newPasswordHash) {
  return new Promise((resolve, reject) => {
      const query = "UPDATE users SET password_hash = ? WHERE email_user = ?";
      connectiondb.query(query, [newPasswordHash, email], (error, result) => {
          if (error) return reject(error);
          resolve(result);
      });
  });
}

function generateRandomPassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const emailHelper = { 
    sendEmail 
};
