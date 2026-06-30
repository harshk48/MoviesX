import React, { useContext, lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Header from "./header.jsx";

const Home = lazy(() => import("./home.jsx"));
const Login = lazy(() => import("./login.jsx"));
const Category = lazy(() => import("./category.jsx"));
const Details = lazy(() => import("./details.jsx"));
const WishList = lazy(() => import("./wishlist.jsx"));
const Register = lazy(() => import("./register.jsx"));
const Filters = lazy(() => import("./filters.jsx"));

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <ToastContainer />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/details" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/wishlist"
            element={user ? <WishList /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/filters" element={<Filters />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;