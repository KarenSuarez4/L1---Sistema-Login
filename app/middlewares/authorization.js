import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import connectiondb from "../database/database.js";

dotenv.config();

async function onlyAdmin(req, res, next) {
  const login = await reviewCookie(req);
  if (login && login.roles.includes("Admin")) return next();
  return res.redirect("/");
}

async function onlyEmployee(req, res, next) {
  const login = await reviewCookie(req);
  if (login && login.roles.includes("Employee")) return next();
  return res.redirect("/");
}

async function onlySuperAdmin(req, res, next) {
  const login = await reviewCookie(req);
  if (login && login.roles.includes("SuperAdmin")) return next();
  return res.redirect("/");
}

async function onlyPublic(req, res, next) {
  const login = await reviewCookie(req);
  if (!login) return next();
  if (login.roles.includes("SuperAdmin")) return res.redirect("/superAdmin");
  if (login.roles.includes("Admin")) return res.redirect("/admin");
  if (login.roles.includes("Employee")) return res.redirect("/employee");
  return res.redirect("/");
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
      const query = `
        SELECT u.user_name, GROUP_CONCAT(r.name_role_user) AS roles
        FROM users u
        LEFT JOIN user_role ur ON u.id_user = ur.id_user
        LEFT JOIN role r ON ur.id_role = r.id_role
        WHERE u.user_name = ?
        GROUP BY u.user_name
      `;
      connectiondb.query(query, [decoded.user], (error, result) => {
        if (error) {
          console.error("Error en la consulta SQL:", error);
          return reject(false);
        }
        if (result.length > 0) {
          result[0].roles = result[0].roles ? result[0].roles.split(",") : [];
          resolve(result[0]);
        } else {
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error("Error verificando cookie:", error);
    return false;
  }
}

export const methods = {
  onlyAdmin,
  onlyEmployee,
  onlySuperAdmin,
  onlyPublic,
};