import React, { useEffect , useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useAuth } from './context.jsx';
import { useContext } from 'react';
import { AuthContext } from './context.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; 

const Movies = () => {
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const navigate = useNavigate();
const [data, setData] = useState([]);
const [VisibleMovies ,setVisibleMovies] = useState([])
const [search, setSearch] = useState("");
const [filteredData, setFilteredData] = useState([]);
 const {setMovieDetails  } = useContext(AuthContext )
 const {wishList  ,  setWishList } = useContext(AuthContext);
 const  {user } = useAuth();

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

//  const settings = {
//    
//   };

const movieDetailsHandle = (id) => () => {
const selectedMovie = data.find(movie => movie.imdbID === id);
  setMovieDetails(selectedMovie);
};
const handleAddToWishlist = (index) => (e) => {
  e.preventDefault();
  const selectedMovie = data[index];
  console.log(selectedMovie)
 const stored =
    JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = stored.some(
    (item) => item.imdbID === selectedMovie.imdbID
  );
 if (exists) {
    alert("Already in wishlist ❌");
    return;
  }
  setWishList([...wishList, selectedMovie]);
    localStorage.setItem("wishlist", JSON.stringify([...wishList, selectedMovie]));
  alert('added in wishlist')
  // navigate(`/wishList`);
};
const handleSearch = (e) => {
  e.preventDefault();
  const filteredMovies = data.filter(movie => 
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredData(filteredMovies );
  // setData([ filteredMovies ]);
  console.log(search);
  if (filteredMovies.length == 0  || search === "") {
   setFilteredData([]);
   navigate('/')  
   
   Movies();
   return;

  }
}
const moviesToShow =
  search === "" ? VisibleMovies : filteredData;
useEffect(() => {
Movies();

}, [])

 
  return (
    <>
    <div className='search-container'>
      <form onSubmit={handleSearch} className='search-bar'>
        <input type='search' placeholder='Search movies...' value={search}   onChange={(e) => setSearch(e.target.value)}/>
        <button className='search-btn'  type='submit'>Search</button>
        
      </form>
      </div>
<div className='movie-container'>
 { moviesToShow.length == 0 ?  <CircularProgress color="error" aria-label="Loading…" />
      : <h1 className='heading'>Recommended Movies</h1> }
   <div className='movies-container'>
      { moviesToShow.map((movie , index) => (
        <Link key={index} to={`./details?${movie.imdbID}`} onClick={movieDetailsHandle(movie.imdbID)} className='cards'>
          <div key={index} className='movie-card'>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <h4>{movie.Year}</h4>
<div  onClick={handleAddToWishlist(index)} className='wishlistbtn'  >
          {user ?  <>
             <span>Add to wishlist</span> <FavoriteIcon style={{ marginRight: 8 }}  />  
          </ >
          : null}
        
</div>
          </div>
        </Link>
      ))  }
     
</div>
    </div>
 </> )

}

export default Movies
