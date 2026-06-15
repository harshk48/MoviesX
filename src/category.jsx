import React, { memo } from "react";
import Movies from "./movies.jsx";
import Series from "./series.jsx";
import Episode from "./episode.jsx";
import { AuthContext } from "./context.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";

const MemoMovies  = memo(Movies);
const MemoSeries  = memo(Series);
const MemoEpisode = memo(Episode);

const Category = () => {
  const { selectedMode, selectedGenre, setSelectedGenre } = useContext(AuthContext);

  const genres = [
    "Action", "Drama", "Sport", "Comedy",
    "Adventure", "Sci-Fi", "Thriller",
  ];

  return (
    <div className={selectedMode === "Dark" ? "dark-mode" : "Light"}>
      <div className="genre-buttons filters">
        {genres.map((genre) => (
          <Link to={`/filters`} key={genre}>
            <button type="button" onClick={() => setSelectedGenre(genre)}>
              {genre}
            </button>
          </Link>
        ))}
      </div>
      <MemoMovies />
      <MemoSeries />
      <MemoEpisode />
    </div>
  );
};

export default Category;