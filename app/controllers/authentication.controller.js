import bcryptjs from "bcryptjs";
import connectiondb from "../database/database.js";
import jsonwebtoken from "jsonwebtoken";

async function login(req, res) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;

  if (!user || !password) {
    return res.status(400).send({ status: "Error", message: "Campos faltantes" });
  }

  const query = "SELECT * FROM users WHERE user_name = ?";
  connectiondb.query(query, [user], async (error, result) => {
    if (error) {
      console.error("Error en la consulta SQL:", error);
      return res.status(500).send({ status: "Error", message: "Error en el servidor" });
    }

    if (result.length === 0) {
      return res.status(400).send({ status: "Error", message: "Usuario o contraseña incorrectos" });
    }

    const userToReview = result[0];
    const loginCorrected = await bcryptjs.compare(password, userToReview.password_hash);

    if (!loginCorrected) {
      return res.status(400).send({ status: "Error", message: "Usuario o contraseña incorrectos" });
    }

    const token = jsonwebtoken.sign(
      { user: userToReview.user_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      path: "/",
    };
    
    res.cookie("jwt", token, cookieOption);
    res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
  });
}

async function saveRegister(req, res) {
  const first_name_person = req.body.first_name_person;
  const last_name_person = req.body.last_name_person;
  const document_number_person = req.body.document_number_person;
  const user_name = req.body.user_name;
  const email_user = req.body.email_user;
  const password = req.body.password;
  let passwordhash = await bcryptjs.hash(password, 8);
  const query = "INSERT INTO users SET ?";
  const values = {
    first_name_person,
    last_name_person,
    document_number_person,
    user_name,
    email_user,
    password_hash: passwordhash,
  };
  connectiondb.query(query, values, (error, result) => {
    if (error) {
      console.error("Error in query sql: ", error);
      return res
        .status(400)
        .json({ status: "Error", message: "Error during registration" });
    }
    return res.status(201).json({
      status: "ok",
      message: "User registered successfully",
      redirect: "/",
    });
  });
}

export const methods = {
  login,
  saveRegister,
};
