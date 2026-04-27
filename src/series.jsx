import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context";
import { Link } from "react-router-dom";
import "./App.css";
import { motion } from "framer-motion";
import { boxVariant } from "./animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

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
      {data.length > 1 ? (
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
      ) : null}
    </motion.div>
  );
};

export default Series;
