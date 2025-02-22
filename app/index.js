import express from "express";

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