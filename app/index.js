import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";
import connection from './database/database.js';

// //Server
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("Server run in port", app.get("port"));

//Configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "login.html"))
);
app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "register.html"))
);
app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "admin", "admin.html"))
);

app.post("/api/register", authentication.saveRegister);
app.post("/api/login", authentication.login);