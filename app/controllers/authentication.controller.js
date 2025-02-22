import bcryptjs from "bcryptjs";


export const usuarios = [
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
  const usuarioAResvisar = usuarios.find((usuario) => usuario.user === user);
  if (!usuarioAResvisar) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error during Log in" });
  }
  const loginCorrect = await bcryptjs.compare(
    password,
    usuarioAResvisar.password
  );
  console.log(loginCorrect);
  if (!loginCorrect) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error during Log in" });
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
  const usuarioAResvisar = usuarios.find((usuario) => usuario.user === user);
  if (usuarioAResvisar) {
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
  usuarios.push(nuevoUsuario);
  console.log(usuarios);
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