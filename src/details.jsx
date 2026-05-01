import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import StarIcon from "@mui/icons-material/Star";
import "./App.css";
import { motion } from "framer-motion";
import { boxVariant } from "./animation";
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
      className="detail-main-con"
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
          sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" , p: 3 , m: 2 }}
        >
          <Typography variant="h4" sx={{ color: "#a00000" , m:2 }}>
            {movieDetails?.Title}
          </Typography>

          <Card
            sx={{
              display: "flex",
              p: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={details.Poster}
              alt={details.Title}
              sx={{ width: 300, borderRadius: 2 }}
            />

            <CardContent sx={{ flex: 1, alignItems: "center" }}>
              <Grid container spacing={7}>
                {/* Title & Director */}
                <Grid item item xs={8} sm={2} md={3} xs={12}>
                  <Typography variant="h5" sx={{ color: "#a00000" }}>
                    {details.Title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Directed by {details.Director}
                  </Typography>
                </Grid>

                {/* Info */}
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", gap: "15px", color: "grey" }}
                >
                  <Typography>{details.Released}</Typography>
                  <Typography>IMDb: {details.imdbRating}</Typography>
                  <Typography>{details.Genre}</Typography>
                </Grid>

                {/* Plot */}
                <Grid item xs={12} md={6} sx={{ color: "#a00000" , mb:2}}>
                  <Typography variant="body1">{details.Plot}</Typography>
                     <Button variant="outlined" 
                                      color="error"  
                                      onClick={() => window.open(`https://www.imdb.com/title/${details.imdbID}`, "_blank")}>
                                        Watch Trailer
                                      </Button>
                </Grid>

                {/* Ratings */}
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Typography variant="h6" color="#a00000">
                    Ratings
                  </Typography>
                  {details.Ratings?.map((rating, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <StarIcon color="error" />
                      <Typography>{rating.Value}</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </motion.div>
  );
};

export default Details;
