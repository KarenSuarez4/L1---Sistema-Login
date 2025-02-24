import bcryptjs from "bcryptjs";
import connectiondb from "../database/database.js";
import jsonwebtoken from "jsonwebtoken";

export const users = [
  {
    user: "a",
    email: "a@a.com",
    password: "$2a$05$nLY2It8riku2vwwDIINdgO/XIyPXRg1Gn9LFgnhwKqC4TwcAwEUL2",
  },
];

async function login(req, res) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;
  if (!user || !password) {
    return res.status(400).send({ status: "Error", message: "Camps missing" });
  }
  const userToReview = users.find((usuario) => usuario.user === user);
  if (!userToReview) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error during login" });
  }
  const loginCorected = await bcryptjs.compare(password, userToReview.password);
  if (!loginCorected) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error during login" });
  }
  const token = jsonwebtoken.sign(
    { user: userToReview.user },
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
