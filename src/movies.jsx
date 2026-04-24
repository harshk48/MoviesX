import React, { useEffect , useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context.jsx';
import { useContext } from 'react';
import { AuthContext } from './context.jsx';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import {boxVariant} from './animation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify";
const Movies = () => {
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const [data, setData] = useState([]);
const [VisibleMovies ,setVisibleMovies] = useState([])
const [search, setSearch] = useState("");
const [filteredData, setFilteredData] = useState([]);
 const {setMovieDetails  } = useContext(AuthContext )
 const {wishList  ,  setWishList } = useContext(AuthContext);
 const  {user } = useAuth();
const navigate = useNavigate()
const {setLoading} = useContext(AuthContext)
const Movies = async () => {
  try {
    const totalPages = 10; // 1 → 100

    const requests = [];

    for (let i = 1; i <= totalPages; i++) {
      requests.push(
        axios(`${API_URL}?s=${search == "" ? "movie" : search}&page=${i}&apikey=${API_KEY}`)  
      );
    }

    const responses = await Promise.all(requests);
    
    // Merge all objects into one array
    const mergedArray = responses.reduce((acc, curr) => {
      if (curr.data.Search) {
        return [...acc, ...curr.data.Search];
      }
      return acc;
    }, []);
    setData(mergedArray);
    setVisibleMovies(mergedArray.slice(0, 10));
    console.log(VisibleMovies)
    console.log(mergedArray);
    
  } catch (error) {
    console.error(error);
  }
};


const movieDetailsHandle = (id) => () => {
const selectedMovie = data.find(movie => movie.imdbID === id);
  setMovieDetails(selectedMovie);
 navigate('/details') 
};
const moviesToShow =
  search == null  ?  filteredData : VisibleMovies; 
  console.log(moviesToShow.length)
const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

const handleAddToWishlist = (index) => (e) => {
  e.preventDefault();
  const selectedMovie = data[index];
  console.log(selectedMovie)
 const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = stored.some(((index)=> index.imdbID === selectedMovie.imdbID)
  );
 if (exists) {
  toast.error("Already in wishlist ❌", {
  position: "top-right",
  hideProgressBar: false,
});
return;
}
  setWishList([...wishList, selectedMovie]);
    localStorage.setItem("wishlist", JSON.stringify([...wishList, selectedMovie]));
 toast.success("added in wishlist!", {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
});
  // navigate(`/wishList`);
};
const handleSearch = (e) => {
  e.preventDefault();
  const filteredMovies = data.filter(movie => 
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );
  if(filteredMovies){
    setFilteredData(filteredMovies );
setVisibleMovies([])

}
// setData([ filteredMovies ]);
setLoading(false); // stop loading
  console.log(search);
   Movies();
   return;
  
}

useEffect(() => {
Movies();

}, [])

 
  return (
    <motion.div variants={boxVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}>
    <div className='search-container'  >
      <form onSubmit={handleSearch} className='search-bar'>
        <input type='search' placeholder='Search movies...' value={search}   onChange={(e) => setSearch(e.target.value)}/>
        <button className='search-btn'  type='submit'>Search</button>
        
      </form>
       
      </div>
<motion.div  className='movie-container' variants={boxVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}>
 { moviesToShow.length == 0 ?  <CircularProgress color="error" aria-label="Loading…" />
      : 
       <h1 className='heading'>Recommended Movies <FontAwesomeIcon icon={faChevronRight} style={{color: "rgb(207, 21, 21)",}} /></h1>}
      
      { moviesToShow.map((movie , index) => (
        <Link key={index} to={`/details`}  onClick={movieDetailsHandle(movie.imdbID)} className='cards'>
          <div key={index} className='movie-card'>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <h4>{movie.Year}</h4>
         
<div  onClick={handleAddToWishlist(index)} className='wishlistbtn'  >
          {user ?  <>
             <span>{stored.some((index)=> index.imdbID === movie.imdbID) ? "added in wishlist" : "add to wishlist"}</span> <FavoriteIcon style={{ marginRight: 8 }}  />
          </ >
          : null}
        
</div>
          </div>
        </Link>
      ))  }
     
</motion.div>
    
 </motion.div> )

}

export default Movies
