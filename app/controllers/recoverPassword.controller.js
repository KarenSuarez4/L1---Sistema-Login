import nodemailer from "nodemailer";
async function sendEmaillll(req,res) {
    const email = req.body.email;
    try {
        let info = await sendEmail(email, "recuperación", "Esta es su contraeña");
        res.status(200).send(`Email sent: ${info.response}`);
    } catch (error) {
        res.status(500).send("Error sending email");
    }
}



async function sendEmail(to, subject, text) {
    const userGmail = "kjulianapena1314@gmail.com";
    const passAppGmail = "wtgb sdzm ceum gqfz";

  // Configuración del transporte
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userGmail,
      pass: passAppGmail,
    },
  });

  // Opciones del correo
  const mailOptions = {
    from: userGmail,
    to: userGmail,
    subject: "Recuperación de contraseñas",
    text: "Su contraseña es: NOSE",
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

export const emailHelper = { 
    sendEmaillll, 
    sendEmail 
};
