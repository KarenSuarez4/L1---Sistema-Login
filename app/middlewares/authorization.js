import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import connectiondb from "../database/database.js";

dotenv.config();

async function onlyAdmin(req, res, next) {
  const login = await reviewCookie(req);
  if (login) return next();
  return res.redirect("/");
}

async function onlyPublic(req, res, next) {
  const login = await reviewCookie(req);
  if (!login) return next();
  return res.redirect("/admin");
}

async function reviewCookie(req) {
  try {
    const cookieJWT = req.headers.cookie
      ?.split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      ?.slice(4);

    if (!cookieJWT) return false;

    const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);

    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE user_name = ?";
      connectiondb.query(query, [decoded.user], (error, result) => {
        if (error) {
          console.error("Error en la consulta SQL:", error);
          return reject(false);
        }
        resolve(result.length > 0);
      });
    });
  } catch (error) {
    console.error("Error verificando cookie:", error);
    return false;
  }
}

export const methods = {
  onlyAdmin,
  onlyPublic,
};
