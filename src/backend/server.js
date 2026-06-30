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

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data || "[]");

    const userExists = users.find((u) => u.username === username);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { username, password, wishlist: [] };
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// LOGIN API - Verify user exists and return wishlist
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
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: { username: user.username, wishlist: user.wishlist || [] },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ADD TO WISHLIST
app.post("/category", (req, res) => {
  try {
    const { username, movie } = req.body;

    const users = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.wishlist.push(movie);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// REMOVE FROM WISHLIST
app.delete("/wishList", (req, res) => {
  try {
    const { username, movie } = req.body;

    const users = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove movie from user's wishlist
    user.wishlist = user.wishlist.filter((m) => m.imdbID !== movie.imdbID);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET USER WISHLIST (by username param)
app.get("/wishlist/:username", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");

    const user = users.find((u) => u.username === req.params.username);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({ wishlist: user.wishlist || [] });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));