import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "../controllers/authentication.controller.js";
dotenv.config();

function onlyAdmin(req, res, next) {
  const login = reviewCookie(req);
  if (login) return next();
  return res.redirect("/");
}

function onlyPublic(req, res, next) {
  const login = reviewCookie(req);
  if (!login) return next();
  return res.redirect("/admin");
}

/*
 function onlyAdmin(req, res, next) {
      const login = reviewCookie(req);
      if (login && login.role === "admin") return next();
      return res.redirect("/");
    }
  
    function onlyEmployee(req, res, next) {
      const login = reviewCookie(req);
      if (login && login.role === "employee") return next();
      return res.redirect("/");
    }
*/

function reviewCookie(req) {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decoded);
    const userToReview = users.find((user) => user.user === decoded.user);
    console.log(userToReview);
    return !!userToReview;
  } catch {
    return false;
  }
}

export const methods = {
  onlyAdmin,
  onlyPublic,
};
