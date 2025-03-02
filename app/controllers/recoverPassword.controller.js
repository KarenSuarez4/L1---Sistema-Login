import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import connectiondb from "../database/database.js";

async function sendEmail(req,res) {
    const email = req.body.email;
    try {
      const isExist = await getUserByEmail(email);
      if (!isExist) {
        return res.status(404).send("Error, user doesn't exist.");
      } else {
        const resetLink = "http://localhost:3000/changePassword";
        const message = `
        <p>Hola,</p>
        <p>Recibimos una solicitud para restablecer tu contraseña en <strong>APP-Login</strong>.</p>
        <p>Para continuar, haz clic en el siguiente enlace:</p><br>
        <p style="text-align: center;">
          <a href="${resetLink}" 
            style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
            Restablecer contraseña
          </a><br>
        </p>
        <p>Si no solicitaste este cambio, ignora este mensaje.</p>
        <br>
        <p>Atentamente,</p>
        <p><strong>El equipo de soporte de APP-Login</strong></p>
      `;
        let info = await sendTwoEmail(email, "Recover password APP-Login", message);
        res.status(200).send(`Email sent: ${info.message}`);
      }
      
  } catch (error) {
      console.error(error);
      res.status(500).send("Error sending email");
  }
}

async function sendTwoEmail(to, subject, htmlContent) {
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
    html: htmlContent,
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
    connectiondb.query(query, [email], (error, results) => {
      if (error) {
        reject(`Error al buscar usuario por email: ${error.message}`);
      } else {
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(null);
        }
      }
    });
  });
}


async function changePassword(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (typeof password !== "string" || !password.trim()) {
      return res.status(400).json({ error: "Invalid password format" });
    }

    const salt = await bcryptjs.genSalt(10); 
    const hashedPassword = await bcryptjs.hash(password, salt);
    await updateUserPassword(email, hashedPassword);
    res.status(200).send("Password changed successfully");
    console.log(password);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
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

export const emailHelper = { 
    sendEmail, 
    changePassword,
};

