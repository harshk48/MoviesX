import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "./App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    let existingUsers = [];
    try {
      const storedData = localStorage.getItem("Register");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        // Ensure it's an array
        existingUsers = Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      existingUsers = [];
    }
    // 1. Get existing users (IMPORTANT)

    // 2. Check duplicate user
    const alreadyExists = existingUsers.some(
      (user) => user.username === username,
    );

    if (alreadyExists) {
      toast.error("User already registered ❌", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });

      setUsername("");
      setPassword("");
      return;
    }

    // 3. Create new user object
    const newUser = { username, password };
    // 4. Add to array
    existingUsers.push(newUser);

    localStorage.setItem("Register", JSON.stringify(existingUsers));
    toast.success("Registration successful ✅", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
    });

    // 6. Clear input fields
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login">
      <form
        action=""
        method="post"
        className="login-form"
        onSubmit={handleRegister}
      >
        <h1 className="login-head">Register Your Account</h1>
        <TextField
          id="standard-basic"
          label="username"
          variant="standard"
          color="error"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          color="error"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
