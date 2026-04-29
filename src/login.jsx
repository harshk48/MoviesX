import React, { useEffect } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context.jsx"; // Assuming you have a context file for authentication
import { useState } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLocalStored = localStorage.setItem(
    "user",
    JSON.stringify({ email, password }),
  );
  const getStoredUser = JSON.parse(localStorage.getItem("user"));
  const storedData = JSON.parse(localStorage.getItem("Register"));
  const handleLogin = (e) => {
    e.preventDefault();
    setLocalStored;
    const user = storedData.find(
      (u) =>
        u.username === getStoredUser.email &&
        u.password === getStoredUser.password,
    );
    if (user) {
      login(email);
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });

      navigate("/");
      getStoredUser;
    } else {
      setEmail("");
      setPassword("");
      toast.error("Invalid email or password!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>

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
          <Box component="form" onSubmit={handleLogin}>
            {/* Heading */}
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              className="heading"
            >
              Login
            </Typography>

            {/* Inputs */}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                label="Email"
                type="email"
                variant="standard"
                color="error"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Register Link */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#1976d2" }}>
                  Register
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
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
