import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useAuth } from "./context.jsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Header = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const drawerContent = (
    <List>
      <ListItem
        button
        component={Link}
        to="/"
        onClick={() => setDrawerOpen(false)}
      >
        <ListItemText
          primary="Home"
          style={{ textDecoration: "none", color: "#a00000" }}
        />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/details"
        onClick={() => setDrawerOpen(false)}
      >
        <ListItemText
          primary="Details"
          style={{ textDecoration: "none", color: "#a00000" }}
        />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/category"
        onClick={() => setDrawerOpen(false)}
      >
        <ListItemText
          primary="category"
          style={{ textDecoration: "none", color: "#a00000" }}
        />
      </ListItem>
      <Divider />
      {user ? (
        <>
          <ListItem
            button
            component={Link}
            to="/wishList"
            onClick={() => setDrawerOpen(false)}
          >
            <FavoriteIcon color="error" style={{ marginRight: 8 }} />
            <ListItemText
              primary="WishList"
              style={{ textDecoration: "none", color: "#a00000" }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleLogout();
              setDrawerOpen(false);
            }}
          >
            <ListItemText
              primary="Logout"
              style={{ textDecoration: "none", color: "#a00000" }}
            />
          </ListItem>
        </>
      ) : (
        <ListItem
          button
          component={Link}
          to="/Login"
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemText
            primary="Login"
            style={{ textDecoration: "none", color: "#a00000" }}
          />
        </ListItem>
      )}
    </List>
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const storedName = parsed.username ?? parsed.email ?? "";
      if (storedName) {
        login(storedName);
      }
    }
  }, [login]);

  return (
    <AppBar
      position="sticky"
      sx={{ background: "transparent", bgcolor: "#a00000" }}
    >
      <Toolbar>
        {/* 🔹 Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#fff",
            padding: "4px 8px",
            fontWeight: "bold",
            flexGrow: 1,
            fontSize: "1.5rem",
              display: "flex",
          }}
        >
          Movies <h1>X</h1>
        </Typography>

        {/* 🔹 Mobile View */}
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <Box sx={{ width: 250, p: 2 }}>{drawerContent}</Box>
            </Drawer>
          </>
        ) : (
          <>
            {/* 🔹 Menu Links */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button component={Link} to="/" sx={{ color: "#fff" , ":hover":{backgroundColor:"#c48888"}}}> 
                Home
              </Button>

              <Button component={Link} to="/category" sx={{ color: "#fff",  ":hover":{backgroundColor:"#c48888"} }}>
                Category
              </Button>
            </Box>

            {/* 🔹 Right Section */}
            <Box sx={{ display: "flex", gap: 2, ml: 3 }}>
              {/* Wishlist */}
              {user && (
                <Button
                  variant="outlined"
                  color="#fff"
                  startIcon={<FavoriteIcon />}
                  component={Link}
                  to="/wishlist"
                >
                  Wishlist
                </Button>
              )}

              {/* Login / Logout */}
              {user ? (
                <Button
                  variant="contained"
                  color="error"
                  component={Link}
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
