import React, { useEffect , useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useAuth } from './context.jsx';
import { useContext } from 'react';
import { AuthContext } from './context.jsx';
import { useNavigate } from 'react-router-dom';
const Movies = () => {
  const navigate = useNavigate();
const [data, setData] = useState([]);
 const {setMovieDetails  } = useContext(AuthContext )
 const {wishList  ,  setWishList } = useContext(AuthContext);
 const  {user } = useAuth();
const Movies = async () => {
const response = await fetch('http://www.omdbapi.com/?apikey=6c6e78f&s=avengers&page=1 ')
const data = await response.json();
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
useEffect(() => {
Movies();
}, [])
 
  return (
    <div className='movies-container'>
      {data.Search?.map((movie , index) => (
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
      ))}

    </div>
  )
}

export default Movies