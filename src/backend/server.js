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
    const { username, password } = req.body;

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
    const newUser = { username, password };
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));