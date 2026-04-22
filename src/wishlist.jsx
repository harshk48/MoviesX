import React from 'react'
import { useContext } from 'react';
import { AuthContext } from './context';
import { Link } from 'react-router-dom';

const WishList = () => {
const { wishList , setWishList   } = useContext(AuthContext);
const {setMovieDetails } = useContext(AuthContext)
const storedwishlist = JSON.parse(localStorage.getItem("wishlist"));
console.log(storedwishlist.length);


const removewishlist = (imdbID) => {
  setWishList(wishList.filter(item => item.imdbID !== imdbID));
   const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
     const updated = stored.filter(
    (item) => item.imdbID !== imdbID
  );
 localStorage.setItem("wishlist", JSON.stringify(updated));

}
const movieDetailsHandle = (id) => () => {
const selectedMovie = storedwishlist.find(movie => movie.imdbID === id);
  setMovieDetails(selectedMovie);
  // navigate('/details')
};

  return (
    <div>
      <h1 className='movie-title'>WishLists</h1>
         <div className='cards'>

{
     storedwishlist.length == 0  ?   <h1 >No Wishlist</h1>
     :  storedwishlist.map((movie , index) => (
  <div key={index} className='movie-card'>
    <img src={movie.Poster} alt={movie.Title} />    
    <h3>{movie.Title}</h3>
    <h4>{movie.Year}</h4>
    <div className='wishlist'>
        <button  className='btn btn-danger' onClick={() => removewishlist(movie.imdbID)}>
          remove from wishlist
        </button>
        <button  className='btn btn-danger'><Link to={`/details`} onClick={movieDetailsHandle(movie.imdbID)}>Details</Link></button>
        

    </div>
  </div>

))}
           
        
              </div>
    </div>
  )
}

export default WishList