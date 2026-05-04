
import require from "require";
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

// Save user
app.post("/src/register.jsx", (req, res) => {
  const newUser = req.body;

  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  users.push(newUser);

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.json({ message: "User saved" });
});

app.listen(5173, () => console.log("Server running"));