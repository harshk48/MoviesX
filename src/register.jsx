import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate()
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
    navigate('/login')

    // 6. Clear input fields
    setUsername("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
        }}
      >
        <Box component="form" onSubmit={handleRegister}>
          {/* Heading */}
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            className="heading"
          >
            Register Your Account
          </Typography>

          {/* Inputs */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Username"
              variant="standard"
              color="error"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              variant="standard"
              color="error"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </Box>

          {/* Login Redirect */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1976d2" }}>
                Login
              </Link>
            </Typography>
          </Box>

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "#a00000",
              "&:hover": { bgcolor: "#800000" },
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
