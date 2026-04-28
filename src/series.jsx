import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context";
import { Link } from "react-router-dom";
import "./App.css";
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
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Series = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { setMovieDetails } = useContext(AuthContext);

  const seriesAPI = async () => {
    const response = await fetch(
      `${API_URL}?s=series&plot=full&page=${page}&apikey=${API_KEY}`,
    );
    const data = await response.json();
    setData(data.Search);
    console.log(data);
  };
  const seriesDetailsHandle = (id) => () => {
    const selectedMovie = data.find((movie) => movie.imdbID === id);
    setMovieDetails(selectedMovie);
    console.log(selectedMovie);
  };

  const handleNext = async () => {
    setPage(page + 1);
    setData(data);
    console.log(data);
  };
  const handlePrev = async () => {
    setPage(page - 1);
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    seriesAPI();
  }, [page]);
  return (
    <motion.div
      className="series-main-container"
      variants={boxVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
    >
      {/* {data.length > 1 ? (
        <h1 className="heading">
          Series{" "}
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ color: "rgb(207, 21, 21)" }}
          />
        </h1>
      ) : null}
      <div className="series-container">
        {page >= 1 ? (
          data?.map((series, index) => (
            <Link
              key={index}
              to={`/details?${series.imdbID}`}
              onClick={seriesDetailsHandle(series.imdbID)}
              className="cards"
            >
              <div key={index} className="series-card">
                <img src={series.Poster} alt={series.Title} />
                <h3>{series.Title}</h3>
                <h4>{series.Year}</h4>
              </div>
            </Link>
          ))
        ) : (
          <h1>page not found</h1>
        )}
      </div>
      {data.length > 1 ? (
        <div className="page-container">
          <FontAwesomeIcon
            onClick={handlePrev}
            size="2xl"
            icon={faCaretLeft}
            style={{ color: "rgb(207, 21, 21)", cursor: "pointer" }}
          />
          <p>{page}</p>{" "}
          <FontAwesomeIcon
            onClick={handleNext}
            icon={faCaretRight}
            size="2xl"
            style={{ color: "rgb(207, 21, 21)", cursor: "pointer" }}
          />
        </div>
      ) : null} */}

      {/* Heading */}
      {data.length > 1 && (
        <Typography
          variant="h5"
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
        >
          Series <ChevronRightIcon sx={{ color: "rgb(207, 21, 21)" }} />
        </Typography>
      )}

      {/* Series Grid */}

      <Box>
        {page >= 1 ? (
          <Grid container spacing={3}>
            {data?.map((series, index) => (
              <Grid
                item
                xs={8}
                sm={2}
                md={3}
                key={index}
                sx={{ display: "flex", flexWrap: "wrap", m: "auto" }}
              >
                <Card
                  component={Link}
                  to={`/details?${series.imdbID}`}
                  onClick={seriesDetailsHandle(series.imdbID)}
                  sx={{ maxWidth: 330, m: 2 }}
                  className="details-info"
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={series.Poster}
                    alt={series.Title}
                  />

                  <CardContent className="details-info">
                    <Typography variant="h6" noWrap>
                      {series.Title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {series.Year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            Page not found
          </Typography>
        )}
      </Box>

      {/* Pagination */}
      {data.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <IconButton onClick={handlePrev} color="error">
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>

          <Typography variant="h6">{page}</Typography>

          <IconButton onClick={handleNext} color="error">
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>
        </Box>
      )}
    </motion.div>
  );
};

export default Series;
