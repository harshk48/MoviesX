import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useAuth } from "./context.jsx";
import { AuthContext } from "./context.jsx";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { boxVariant } from "./animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {
  Card,
  TextField,
  CardMedia,
  CardContent,
  Typography,
  Box,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { addtoWishlist } from "./utils/authService.js";
import { motion } from "framer-motion";

// Skeleton card — mirrors the real card's layout exactly
const MovieSkeletonCard = () => (
  <Card
    sx={{ maxWidth: 280, m: 2, backgroundColor: "#c7c7c7" }}
    className="movie-card"
  >
    {/* Poster placeholder */}
    <Skeleton variant="rectangular" height={250} animation="wave" />

    <CardContent>
      {/* Title placeholder */}
      <Skeleton
        variant="text"
        sx={{ fontSize: "1.25rem", mb: 0.5 }}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="40%"
        sx={{ fontSize: "0.875rem", mb: 2 }}
        animation="wave"
      />

      {/* Button placeholders */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          maxWidth: { xs: "100%", sm: 600 },
        }}
      >
        <Skeleton variant="rounded" width={100} height={36} animation="wave" />
        <Skeleton variant="rounded" width={100} height={36} animation="wave" />
      </Box>
    </CardContent>
  </Card>
);

const MoviesComponent = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState([]);
  const [VisibleMovies, setVisibleMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { setMovieDetails } = useContext(AuthContext);
  const { wishList, setWishList } = useContext(AuthContext);
  const { user, selectedMode } = useAuth();

  const debounceTimer = useRef(null);

  const fetchMovies = useCallback(
    async (term = "movie") => {
      try {
        setLoading(true);
        const query = encodeURIComponent(term.trim() || "movie");
        const response = await axios(`${API_URL}?s=${query}&apikey=${API_KEY}`);
        const mergedArray = Array.isArray(response.data.Search)
          ? response.data.Search.filter(
              (movie, index, arr) =>
                index === arr.findIndex((item) => item.imdbID === movie.imdbID),
            )
          : [];

        setData(mergedArray);
        setVisibleMovies(mergedArray.slice(0, 10));
      } catch (error) {
        console.error(error);
        setData([]);
        setVisibleMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [API_URL, API_KEY],
  );

  const movieDetailsHandle = (id) => () => {
    const selectedMovie = data.find((movie) => movie.imdbID === id);
    setMovieDetails(selectedMovie);
  };

  const moviesToShow = VisibleMovies;

  const handleAddToWishlist = (index) => async (e) => {
    e.preventDefault();
    const selectedMovie = moviesToShow[index];

    const exists = wishList.some(
      (movie) => movie.imdbID === selectedMovie.imdbID,
    );

    if (exists) {
      toast.error("Already in wishlist ❌");
      return;
    }

    const updated = [...wishList, selectedMovie];
    setWishList(updated);

    const result = await addtoWishlist(selectedMovie);

    if (result.success) {
      toast.success("Added to wishlist ✅");
    } else {
      toast.error("Failed to add to wishlist ❌");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      fetchMovies(value);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    fetchMovies(search);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  useEffect(() => {
    fetchMovies("movie");
  }, [fetchMovies]);

  return (
    <motion.div
      id="movies"
      variants={boxVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      className="movies-container"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="search-bar"
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: { xs: "100%", sm: 600 },
          mb: 3,
        }}
      >
        <TextField
          type="search"
          placeholder="Search movies..."
          variant="outlined"
          value={search}
          color="error"
          onChange={handleInputChange}
          className="Textfield"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 42,
              borderRadius: "8px 0px 0px 8px",
              color: "red",
              "& fieldset": { borderRight: "none" },
              "&.Mui-focused fieldset": { borderRight: "none" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "red" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ borderRadius: "0 8px 8px 0", px: 3, py: 1.7, height: 44 }}
        >
          <SearchIcon />
        </Button>
      </Box>

      <motion.div
        className="movie-container"
        variants={boxVariant}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
      >
        <h1 className="heading">
          Recommended Movies{" "}
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ color: "rgb(207, 21, 21)" }}
          />
        </h1>
        {loading ? (
          // 10 skeleton cards matching real card dimensions
          Array.from({ length: 10 }).map((_, i) => (
            <MovieSkeletonCard key={i} />
          ))
        ) : moviesToShow.length === 0 ? (
          <Typography variant="body1" color="error">
            No movies found for this search.
          </Typography>
        ) : (
          <>
            {moviesToShow.map((movie, index) => (
              <Card
                key={movie.imdbID}
                sx={{
                  maxWidth: 280,
                  m: 2,
                  backgroundColor: selectedMode === "Dark" ? "#2c2c2c" : "#fff",
                }}
                className="movie-card"
              >
                <Link
                  to={`/details`}
                  onClick={movieDetailsHandle(movie.imdbID)}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={movie.Poster}
                    alt={movie.Title}
                  />
                </Link>

                <CardContent className="details-info">
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {movie.Title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {movie.Year}
                  </Typography>

                  {user && (
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          window.open(
                            `https://www.imdb.com/title/${movie.imdbID}`,
                            "_blank",
                          )
                        }
                      >
                        Trailer
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        color={
                          wishList.some((item) => item.imdbID === movie.imdbID)
                            ? "success"
                            : "error"
                        }
                        startIcon={<FavoriteIcon />}
                        fullWidth
                        onClick={handleAddToWishlist(index)}
                      >
                        {wishList.some((item) => item.imdbID === movie.imdbID)
                          ? "Added in Wishlist"
                          : "Add to Wishlist"}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MoviesComponent;
