import { createRequire } from "module";
import { fileURLToPath } from "url";
const require = createRequire(import.meta.url);
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "users.json");

// Initialize users.json if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

// REGISTER API - Check if user exists and register new user
app.post("/register", (req, res) => {
  try {
    const { username, password  } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Read existing users
    const data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data || "[]");

    // Check if user already exists
    const userExists = users.find((u) => u.username === username);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Add new user
    const newUser = { username, password , wishlist: []};
    users.push(newUser);

    // Save to JSON file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// LOGIN API - Verify user exists
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data || "[]");

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ADD TO WISHLIST
// ======================

app.post("/category", (req, res) => {

  const { username , movie } = req.body;

  const users = JSON.parse(fs.readFileSync(filePath) || "[]");
  const user = users.find((u) => u.username === username);
  if (user){
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    user.wishlist.push(movie);
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // already exists
  const exists = user.wishlist.some((item) => item.imdbID === movie.imdbID);
  if (exists) {
    return res.json({
      message: "Already in wishlist",
    });
  }

  res.json({
    message: "Added to wishlist",
    wishlist: user.wishlist,
  });
});
app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));