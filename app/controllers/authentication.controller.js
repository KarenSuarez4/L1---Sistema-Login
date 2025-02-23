import bcryptjs from "bcryptjs";
import connectiondb from "../database/database.js";

async function login(req, res) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;
  const query = 'SELECT * FROM users WHERE user_name = ?';
  const values = [user];
  connectiondb.query(query, values, async (errror, result) => {
    if (result.length == 0 || !(await bcryptjs.compare(password, result[0].password_hash))) {
      return res.status(401).json({ status: "Error", message: "Invalid user or password" });
    } else {
      return res.status(200).json({ status: "ok", message: "User logged in successfully", redirect: "/admin" });
    }
  })
};

async function saveRegister(req, res) {
  const first_name_person = req.body.first_name_person;
  const last_name_person = req.body.last_name_person;
  const document_number_person = req.body.document_number_person;
  const user_name = req.body.user_name;
  const email_user = req.body.email_user;
  const password = req.body.password;
  let passwordhash = await bcryptjs.hash(password, 8);
  const query = 'INSERT INTO users SET ?';
  const values = { first_name_person, last_name_person, document_number_person, user_name, email_user, password_hash: passwordhash }
  connectiondb.query(query, values, (error, result) => {
    if (error) {
      console.error("Error in query sql: ", error);
      return res.status(400).json({ status: "Error", message: "Error during registration" });
    }
    return res.status(201).json({ status: "ok", message: "User registered successfully", redirect: "/" });
  });
}

export const methods = {
  login,
  saveRegister,
};