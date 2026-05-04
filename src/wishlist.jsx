import React from "react";
import { useContext } from "react";
import { AuthContext } from "./context";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom className="heading">
        WishLists  <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "rgb(207, 21, 21)" }}
            />
      </Typography>

      {/* Empty State */}
      {storedwishlist.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 3 }}
          className="heading"
        >
          No Wishlist
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{  display:"flex" , justifyContent:"center" , flexWrap:"wrap" }}>
          {storedwishlist.map((movie, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 310, m: 2 }} >
                {/* Poster */}
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.Poster}
                  alt={movie.Title}
                />

                {/* Content */}
                <CardContent className="details-info">
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
                      color="error"
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
