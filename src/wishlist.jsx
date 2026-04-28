import React from "react";
import { useContext } from "react";
import { AuthContext } from "./context";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
const WishList = () => {
  const { wishList, setWishList } = useContext(AuthContext);
  const { setMovieDetails } = useContext(AuthContext);
  const storedwishlist = JSON.parse(localStorage.getItem("wishlist"));

  const removewishlist = (imdbID) => {
    setWishList(wishList.filter((item) => item.imdbID !== imdbID));
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updated = stored.filter((item) => item.imdbID !== imdbID);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };
  const movieDetailsHandle = (id) => () => {
    const selectedMovie = storedwishlist.find((movie) => movie.imdbID === id);
    setMovieDetails(selectedMovie);
    // navigate('/details')
  };

  return (
    // <div className="home-container">
    //   <h1 className="movie-title">WishLists</h1>
    //   <div className="cards">
    //     {storedwishlist.length == 0 ? (
    //       <h1>No Wishlist</h1>
    //     ) : (
    //       storedwishlist.map((movie, index) => (
    //         <div key={index} className="movie-card">
    //           <img src={movie.Poster} alt={movie.Title} />
    //           <h3>{movie.Title}</h3>
    //           <h4>{movie.Year}</h4>
    //           <div className="wishlist">
    //             <button
    //               className="btn btn-danger"
    //               onClick={() => removewishlist(movie.imdbID)}
    //             >
    //               remove from wishlist
    //             </button>
    //             <button className="btn btn-danger">
    //               <Link
    //                 to={`/details`}
    //                 onClick={movieDetailsHandle(movie.imdbID)}
    //               >
    //                 Details
    //               </Link>
    //             </button>
    //           </div>
    //         </div>
    //       ))
    //     )}
    //   </div>
    // </div>
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom className="heading">
        WishLists
      </Typography>

      {/* Empty State */}
      {storedwishlist.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 5 }}
          className="heading"
        >
          No Wishlist
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {storedwishlist.map((movie, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 310, m: 2 }} className="details-info">
                {/* Poster */}
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.Poster}
                  alt={movie.Title}
                />

                {/* Content */}
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {movie.Title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {movie.Year}
                  </Typography>

                  {/* Buttons */}
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removewishlist(movie.imdbID)}
                    >
                      Remove from Wishlist
                    </Button>

                    <Button
                      variant="outlined"
                      component={Link}
                      to="/details"
                      onClick={movieDetailsHandle(movie.imdbID)} // ✅ FIXED
                    >
                      Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishList;
