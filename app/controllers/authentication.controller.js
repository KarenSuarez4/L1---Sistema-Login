import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }
  const usuarioAResvisar = users.find((usuario) => usuario.user === user);
  if (!usuarioAResvisar) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  const loginCorrecto = await bcryptjs.compare(
    password,
    usuarioAResvisar.password
  );
  if (!loginCorrecto) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  const token = jsonwebtoken.sign(
    { user: usuarioAResvisar.user },
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
async function register(req, res) {
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;
  if (!user || !password || !email) {
    return res.status(400).send({ status: "Error", message: "Missing camps" });
  }
  const userToReview = users.find((user) => user.user === user);
  if (userToReview) {
    return res
      .status(400)
      .send({ status: "Error", message: "This user already exists" });
  }
  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(password, salt);
  const newUser = {
    user,
    email,
    password: hashPassword,
  };
  users.push(newUser);
  console.log(users);
  return res.status(201).send({
    status: "ok",
    message: `User ${newUser.user} included`,
    redirect: "/",
  });
}

export const methods = {
  login,
  register,
};
