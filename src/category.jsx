import React from "react";
import Movies from "./movies.jsx";
import Series from "./series.jsx";
import Episode from "./episode.jsx";
import { AuthContext } from "./context.jsx";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";


const Home = () => {
  const { selectedMode } = useContext(AuthContext);

  return (
    <div className={selectedMode === "Dark" ? "dark-mode" : "Light"}>
      <Movies />
      <Series />
      <Episode />
    
    </div>
  );
};

export default Home;
