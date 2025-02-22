import express from "express";

const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("Server run in port", app.get("port"));

//Configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
