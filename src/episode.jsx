import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context";
import { motion } from "framer-motion";
import { boxVariant } from "./animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


const Episode = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { setMovieDetails } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const episodeAPI = async () => {
    const response = await fetch(
      `${API_URL}?s=episode&plot=full&page=1&apikey=${API_KEY}`,
    );
    const data = await response.json();
    setData(data.Search);
    console.log(data);
  };

  const movieDetailsHandle = (id) => () => {
    const selectedMovie = data.find((movie) => movie.imdbID === id);

    setMovieDetails(selectedMovie);
  };
  useEffect(() => {
    episodeAPI();
  }, []);
  return (
    <motion.div
      className="episode-main-container"
      variants={boxVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      {data.length > 1 && (
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            color: "#a00000",
          }}
        >
          Episode <ChevronRightIcon sx={{ color: "rgb(207, 21, 21)" }} />
        </Typography>
      )}

      {/* Episodes Grid */}
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {data?.map((episode, index) => (
          <Grid  key={index}>
            <Card
              component={Link}
              to={`/details?${episode.imdbID}`}
              onClick={movieDetailsHandle(episode.imdbID)}
              sx={{ maxWidth: 310, m: 2 }}
              className="details-cards"
            >
              <CardMedia
                component="img"
                height="250"
                image={episode.Poster}
                alt={episode.Title}
              />
              <CardContent className="details-info">
                <Typography variant="h6">
                  {episode.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {episode.Year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default Episode;
