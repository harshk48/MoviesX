import React from 'react'
import { useContext } from 'react';
import { AuthContext } from './context';

const WishList = () => {
const { wishList , setWishList } = useContext(AuthContext);
console.log(wishList);

const removewishlist = (imdbID) => {
  setWishList(wishList.filter(item => item.imdbID !== imdbID));
}

  return (
    <div>
      <h1 className='movie-title'>WishLists</h1>
         <div className='cards'>
{ wishList.length == 0 ? <h2>No movies in wishlist</h2>
 : wishList.map((movie , index) => (
  <div key={index} className='movie-card'>
    <img src={movie.Poster} alt={movie.Title} />    
    <h3>{movie.Title}</h3>
    <h4>{movie.Year}</h4>
    <div className='wishlist'>
        <button  className='btn btn-danger' onClick={() => removewishlist(movie.imdbID)}>
          remove
        </button>
        <button  className='btn btn-danger'>Book</button>
        

    </div>
  </div>

))}
           
        
              </div>
    </div>
  )
}

export default WishList