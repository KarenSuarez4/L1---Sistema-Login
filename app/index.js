import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";
import { emailHelper } from "./controllers/recoverPassword.controller.js";

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
app.get("/recoverPassword", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "recoverPassword.html"))
);

app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);
// app.post("/api/recoverPassword", recover.recoverPassword);


app.post("/api/recoverPassword", emailHelper.sendEmaillll);
