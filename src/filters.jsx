import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "./context.jsx";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box , Button  } from "@mui/material";
import {useAuth} from "./context.jsx"
import { toast } from "react-toastify";
import {addtoWishlist } from "./utils/authService.js";
import Skeleton from "@mui/material/Skeleton";

const MovieSkeletonCard = () => (
  <Card sx={{ maxWidth: 280, m: 2, backgroundColor: "#c7c7c7"}} className="movie-card">
    {/* Poster placeholder */}
    <Skeleton variant="rectangular" height={250} animation="wave" />

    <CardContent>
      {/* Title placeholder */}
      <Skeleton variant="text" sx={{ fontSize: "1.25rem", mb: 0.5 }} animation="wave" />
      <Skeleton variant="text" width="40%" sx={{ fontSize: "0.875rem", mb: 2 }} animation="wave" />

      {/* Button placeholders */}
      <Box sx={{ display: "flex", gap: 1 , flexWrap:"wrap" ,  maxWidth: { xs: "100%", sm: 600 },}} >
        <Skeleton variant="rounded" width={100} height={36} animation="wave" />
        <Skeleton variant="rounded" width={100} height={36} animation="wave" />
      </Box>
    </CardContent>
  </Card>
);


const Filters = () => {
  const { selectedGenre, setMovieDetails, selectedMode } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
 const { user , wishList , setWishList } = useAuth();
 
  useEffect(() => {
    if (!selectedGenre) return;
    const fetchByGenre = async () => {
      try {
        const res = await axios(`${API_URL}?s=${selectedGenre}&apikey=${API_KEY}`);
        setMovies(res.data.Search || []);
      } catch (err) {
        console.error(err);
        setMovies([]);
      }
    };
    fetchByGenre();
  }, [selectedGenre, API_URL, API_KEY]);

  const movieDetailsHandle = (id) => () => {
    const selected = movies.find((m) => m.imdbID === id);
    setMovieDetails(selected);
  };

  const moviesToShow = movies || [];

  const handleAddToWishlist = (index) => async (e) => {
      e.preventDefault();
      const selectedMovie = moviesToShow[index];
      const exists = wishList.some(
        (movie) => movie.imdbID === selectedMovie.imdbID,
      );
      if (exists) {
        toast.error("Already in wishlist ❌", {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 1000,
        });
        return;
      }
  
      const updated = [...wishList, selectedMovie];
      setWishList(updated);
  
      const result = await addtoWishlist(selectedMovie);
      if (result.success) {
        toast.success(result.message || "Added to wishlist ✅", {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 1000,
        });
      } else {
        toast.error(result.message || "Failed to add to wishlist ❌", {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 1000,
        });
      }
  
      // navigate(`/wishList`);
    };


  return (
    <div>
     <div style={{backgroundColor:selectedMode === "Dark" ? "#2f2f2f" : "#a00000" , padding:10 , color:selectedMode === "Dark" ? "#a00000" : "#fff"}}>
      <p><Link to={'/'} >Home</Link>/<Link to={'/category'}>category</Link>/{selectedGenre}</p>
      
     </div>
      <div className="movie-container">
        {movies.length === 0 ? (
            Array.from({ length: 10 }).map((_, i) => (
            <MovieSkeletonCard key={i} />
          ))
        ) : (
          movies.map((movie , index) => (
            <Card
              key={movie.imdbID}
              sx={{ maxWidth: 280, m: 2, backgroundColor: selectedMode === "Dark" ? "#2c2c2c" : "#fff" }}
              className="movie-card"
            >
              <Link to="/details" onClick={movieDetailsHandle(movie.imdbID)}>
                <CardMedia component="img" height="250" image={movie.Poster} alt={movie.Title} />
              </Link>
              <CardContent className="details-info">
                <Typography variant="h6">{movie.Title}</Typography>
                <Typography variant="body2" color="text.secondary">{movie.Year}</Typography>
                    {/* Wishlist Button */}
                                {user && (
                                  <Box sx={{ mt: 2  , display: "flex" , gap: 1}}>
                                    <Button
                                      type="button"
                                      variant="outlined"
                                      color="error"
                                      onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")}
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
          ))
        )}
      </div>
    </div>
  );
};

export default Filters;