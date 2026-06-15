import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css";
import { exportRegisterData } from "./utils/authService";
import bg from "./assets/bg.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields ❌", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    setLoading(true);

    try {
      const result = await exportRegisterData(username, password);

      if (result.success) {
        toast.success(result.message || "Registration successful ✅", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
        });
        navigate("/login");
      } else {
        toast.error(result.message || "User already exists ❌", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
        });
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ❌", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 350, borderRadius: 3 }}>
        <Box component="form" onSubmit={handleRegister}>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            className="heading"
          >
            Register Your Account
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Username"
              variant="standard"
              color="error"
              type="email"
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

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1976d2" }}>
                Login
              </Link>
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              bgcolor: "#a00000",
              "&:hover": { bgcolor: "#800000" },
              "&:disabled": { bgcolor: "#cccccc" },
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
