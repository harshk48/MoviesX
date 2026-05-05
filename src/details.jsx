import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import StarIcon from "@mui/icons-material/Star";
import "./App.css";
import { motion } from "framer-motion";
import { boxVariant } from "./animation";
import {Chip} from "@mui/material";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const Details = () => {
  const { movieDetails } = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  const DetailApi = async () => {
    const response = await fetch(
      `${API_URL}?i=${movieDetails.imdbID}&apikey=${API_KEY}`,
    );
    const data = await response.json();
    setDetails(data);
    console.log(data);
  };
  useEffect(() => {
    DetailApi();
  }, []);

  return (

    <motion.div
  variants={boxVariant}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.6 }}
  className="details-cards"
>
  {details.length === 0 ? (
    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
      Please select a movie to view details
    </Typography>
  ) : (
    <Box
      sx={{
        p: 3,
        m: 2,
        borderRadius: 4,
        background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)",
        color: "#fff",
      }}
    >
      {/* Movie Title */}
      <Typography
        variant="h3"
        sx={{
          color: "#ff3d3d",
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
        }}
      >
        {details.Title}
      </Typography>

      <Card
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          p: 3,
          borderRadius: 4,
          background: "#111",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* Poster */}
        <CardMedia
          component="img"
          image={details.Poster}
          alt={details.Title}
          sx={{
            width: 280,
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />

        {/* Content */}
        <CardContent sx={{ flex: 1 }}>
          {/* Director */}
          <Typography variant="h6" sx={{ mb: 1 , color: "#ff3d3d"}}>
            🎬 Directed by{" "}
            <span style={{fontWeight: "bold" }}>
              {details.Director}
            </span>
          </Typography>

          {/* Info Row */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              mb: 2,
              color: "#bbb",
            }}
          >
            <Chip label={details.Released} color="error" />
            <Chip label={`IMDb ${details.imdbRating}`} color="error" />
            <Chip label={details.Genre} color="error" />
          </Box>

          {/* Plot */}
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, mb: 3, color: "#ddd" }}
          >
            {details.Plot}
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(255,0,0,0.4)",
            }}
            onClick={() =>
              window.open(
                `https://www.imdb.com/title/${details.imdbID}`,
                "_blank"
              )
            }
          >
            🎥 Watch Trailer
          </Button>

          {/* Ratings */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 1, color: "#ff3d3d" }}>
              ⭐ Ratings
            </Typography>

            {details.Ratings?.map((rating, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#1f1f1f",
                  color: "#ff3d3d",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <Typography>{rating.Value}</Typography>
                
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )}
</motion.div>
  );
};

export default Details;
