import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useAuth } from "./context.jsx";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Movies = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState([]);
  const [VisibleMovies, setVisibleMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { setMovieDetails } = useContext(AuthContext);
  const { wishList, setWishList } = useContext(AuthContext);
  const { user } = useAuth();

  const { setLoading } = useContext(AuthContext);
  const Movies = async () => {
    try {
      const totalPages = 10; // 1 → 100

      const requests = [];

      // for (let i = 1; i <= totalPages; i++) {
        requests.push(
          axios(
            `${API_URL}?s=${search == "" ? "movie" : search}&apikey=${API_KEY}`,
          ),
        );
      // }

      const responses = await Promise.all(requests);

      // Merge all objects into one array
      const mergedArray = responses.reduce((acc, curr) => {
        if (curr.data.Search) {
          return [...acc, ...curr.data.Search];
        }
        return acc;
      }, []);
      setData(mergedArray);
      setVisibleMovies(mergedArray.slice(0, 10));
      console.log(VisibleMovies);
      console.log(mergedArray);
    } catch (error) {
      console.error(error);
    }
  };

  const movieDetailsHandle = (id) => () => {
    const selectedMovie = data.find((movie) => movie.imdbID === id);
    setMovieDetails(selectedMovie);
  };
  const moviesToShow = search == null ? filteredData : VisibleMovies;
  console.log(moviesToShow.length);
  const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

  const handleAddToWishlist = (index) => (e) => {
    e.preventDefault();
    const selectedMovie = data[index];
    console.log(selectedMovie);
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = stored.some(
      (index) => index.imdbID === selectedMovie.imdbID,
    );
    if (exists) {
      toast.error("Already in wishlist ❌", {
        position: "top-right",
        hideProgressBar: false,
      });
      return;
    }

    setWishList([...wishList, selectedMovie]);
    localStorage.setItem(
      "wishlist",
      JSON.stringify([...wishList, selectedMovie]),
    );
    toast.success("added in wishlist!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
    });
    // navigate(`/wishList`);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredMovies = data.filter((movie) =>
      movie.Title.toLowerCase().includes(search.toLowerCase()),
    );
    if (filteredMovies) {
      setFilteredData(filteredMovies);
      setVisibleMovies([]);
    }
    // setData([ filteredMovies ]);
    setLoading(false); // stop loading
    console.log(search);
    Movies();
    return;
  };

  useEffect(() => {
    Movies();
  }, []);

  return (
    <motion.div
      variants={boxVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      className="movies-container "
    >
      <Box component="form" onSubmit={handleSearch} className="search-bar">
        <TextField
          type="search"
          placeholder="Search movies..."
          variant="outlined"
          value={search}
          color="error"
          onChange={(e) => setSearch(e.target.value)}
          className="TextField"
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          className="search-btn"
        >
          Search
        </Button>
      </Box>
      <motion.div
        className="movie-container"
        variants={boxVariant}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
      >
        {moviesToShow.length == 0 ? (
          <CircularProgress color="error" aria-label="Loading…" />
        ) : (
          <h1 className="heading">
            Recommended Movies{" "}
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "rgb(207, 21, 21)" }}
            />
          </h1>
        )}

        {moviesToShow.map((movie, index) => (
          
            <Card
              key={index}
              sx={{ maxWidth: 330, m: 2 }}
              className="movie-card"
            >
              {/* Poster */}
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
              {/* Content */}
              <CardContent className="details-info">
                <Typography variant="h6" >
                  {movie.Title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {movie.Year}
                </Typography>

                {/* Wishlist Button */}
                {user && (
                  <Box sx={{ mt: 2  , display: "flex" , gap: 1}}>
                    <Button variant="outlined" 
                    color="error"  
                    onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")}>
                      Trailer
                    </Button>
                    <Button
                      variant="contained"
                      color={
                        stored.some((item) => item.imdbID === movie.imdbID)
                          ? "success"
                          : "error"
                      }
                      startIcon={<FavoriteIcon />}
                      fullWidth
                      onClick={handleAddToWishlist(index)} 
                    >
                      {stored.some((item) => item.imdbID === movie.imdbID)
                        ? "Added in Wishlist"
                        : "Add to Wishlist"}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
         
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Movies;
