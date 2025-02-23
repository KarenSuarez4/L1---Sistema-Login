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
    return res.status(400).send({ status: "Error", message: "Missing camps" });
  }
  const userToReview = users.find((usuario) => usuario.user === user);
  if (!userToReview) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error during Log in" });
  }
  const loginCorrect = await bcryptjs.compare(
    password,
    userToReview.password
  );
  console.log(loginCorrect);
  if (!loginCorrect) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error during Log in" });
  }
  const token = jsonwebtoken.sign(
    {user: userToReview.user}, 
    process.env.JWT_SECRET,
    {expiresIn:procces.env.JWT_EXPIRATION});

    const cookieOption={
        
    }
  res.send({ status: "ok", message: "Log in correct", redirect: "/admin" });
}

async function register(req, res) {
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;
  if (!user || !password || !email) {
    return res.status(400).send({ status: "Error", message: "Missing camps" });
  }
  const userToReview = users.find((usuario) => usuario.user === user);
  if (userToReview) {
    return res
      .status(400)
      .send({ status: "Error", message: "This user already exists" });
  }
  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(password, salt);
  const nuevoUsuario = {
    user,
    email,
    password: hashPassword,
  };
  users.push(nuevoUsuario);
  console.log(users);
  return res.status(201).send({
    status: "ok",
    message: `User ${nuevoUsuario.user} included`,
    redirect: "/",
  });
}

export const methods = {
  login,
  register,
};
