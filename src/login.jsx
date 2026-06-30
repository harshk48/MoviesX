import React, { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context.jsx";
import { loginUser, fetchWishlist } from "./utils/authService";
import { toast } from "react-toastify";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import bg from "./assets/bg.jpg";
import { MdLogin } from "react-icons/md";

const Login = () => {
  const { login, setWishList } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);

    if (result.success) {
      login(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));

      // Fetch wishlist for this user and store it in context
      const wishlistResult = await fetchWishlist(result.user.username);
      setWishList(wishlistResult.wishlist || []);

      toast.success(result.message || "Login Successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });
      navigate("/");
    } else {
      setPassword("");
      toast.error(result.message || "Invalid email or password!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }

    setLoading(false);
  };

  return (
    <>
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
              className="heading "
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              Login <MdLogin />
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