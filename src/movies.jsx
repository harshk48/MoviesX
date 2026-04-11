import React, { useEffect , useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useAuth } from './context.jsx';
import { useContext } from 'react';
import { AuthContext } from './context.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Movies = () => {
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
const [data, setData] = useState([]);
const [search, setSearch] = useState([]);
const [filteredData, setFilteredData] = useState([]);
 const {setMovieDetails  } = useContext(AuthContext )
 const {wishList  ,  setWishList } = useContext(AuthContext);
 const  {user } = useAuth();

const Movies = async  () => {
const response = await axios(`${API_URL}?s=movie&plot=full&page=3&apikey=${API_KEY}`);
const data = await response.data;
setData(data);
console.log(data);
}

const movieDetailsHandle = (id) => () => {
const selectedMovie = data.Search.find(movie => movie.imdbID === id);
  setMovieDetails(selectedMovie);
};
const handleAddToWishlist = (index) => (e) => {
  e.preventDefault();
  const selectedMovie = data.Search[index];
  if (wishList.find(item => item.imdbID === selectedMovie.imdbID)) {
    alert("Already in wishlist");
    return;
  }
  setWishList([...wishList, selectedMovie]);
  navigate(`/wishList`);
};
const handleSearch = (e) => {
  e.preventDefault();
  const filteredMovies = data.Search.filter(movie => 
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredData([  filteredMovies ]);
  setData({ Search: filteredMovies });
  console.log(search);
  if (filteredMovies.length === 0  || search === "") {
   setFilteredData([]);  
   setData({ Search: [] });
   Movies();
   return;

  }
}

useEffect(() => {
Movies();
}, [])

 
  return (
    <>
    <div className='search-container'>
      <form onSubmit={ handleSearch} className='search-bar'>
        <input type='search' placeholder='Search movies...' value={search}   onChange={(e) => setSearch(e.target.value)}/>
        <button className='search-btn'  type='submit'>Search</button>
        
      </form>

      </div>

   <div className='movies-container'>
      { filteredData  ?  data.Search?.map((movie , index) => (
        <Link to={`./details?${movie.imdbID}`} onClick={movieDetailsHandle(movie.imdbID)} className='cards'>
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
      )) : <h2>No movies found</h2>}

    </div>
 </> )
}

export default Movies
