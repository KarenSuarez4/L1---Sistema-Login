import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { methods as authentication } from "./controllers/authentication.controller.js";
import { emailHelper } from "./controllers/recoverPassword.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Server
const app = express();
const port = process.env.PORT || 3000;

app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${port}`);
});

// Configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.get("/", authorization.onlyPublic, (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "login.html"))
);
app.get("/register", authorization.onlyPublic, (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "register.html"))
);
app.get("/superAdmin", authorization.onlySuperAdmin, (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "superAdmin", "superAdmin.html"))
);
app.get("/admin", authorization.onlyAdmin, (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "admin", "admin.html"))
);
app.get("/recoverPassword", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "recoverPassword.html"))
);
app.get("/employee", authorization.onlyEmployee, (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "employee", "employee.html"))
);

app.post("/api/register", authentication.saveRegister);
app.post("/api/login", authentication.login);
