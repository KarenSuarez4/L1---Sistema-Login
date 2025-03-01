import bcryptjs from "bcryptjs";
import connectiondb from "../database/database.js";
import jsonwebtoken from "jsonwebtoken";

async function login(req, res) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;

  if (!user || !password) {
    return res.status(400).send({ status: "Error", message: "Missing fields" });
  }

  try {
    const userToReview = await getUserByUsername(user);
    if (!userToReview) {
      return res.status(400).send({ status: "Error", message: "Incorrect username or password" });
    }

    if (userToReview.count > 5) {
      await deactivateUser(user);
      return res.status(400).send({ status: "Error", message: "User blocked due to multiple failed attempts" });
    }

    if (!userToReview.is_actived) {
      return res.status(400).send({ status: "Error", message: "Inactive user" });
    }

    const loginCorrected = await bcryptjs.compare(password, userToReview.password_hash);
    if (!loginCorrected) {
      await incrementFailedAttempts(user);
      return res.status(400).send({ status: "Error", message: "Incorrect username or password" });
    }

    const token = generateToken(userToReview.user_name);
    setTokenCookie(res, token);
    await resetFailedAttempts(user);

    res.send({ status: "ok", message: "User logged in", redirect: "/admin" });
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).send({ status: "Error", message: "Server error" });
  }
}

function getUserByUsername(user) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE user_name = ?";
    connectiondb.query(query, [user], (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result[0]);
    });
  });
}

function deactivateUser(user) {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET is_actived = false WHERE user_name = ?";
    connectiondb.query(query, [user], (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function incrementFailedAttempts(user) {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET count = count + 1 WHERE user_name = ?";
    connectiondb.query(query, [user], (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function resetFailedAttempts(user) {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET count = 0 WHERE user_name = ?";
    connectiondb.query(query, [user], (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function generateToken(user) {
  return jsonwebtoken.sign(
    { user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
}

function setTokenCookie(res, token) {
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    path: "/",
  };
  res.cookie("jwt", token, cookieOption);
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
