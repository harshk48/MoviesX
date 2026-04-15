import React from 'react'
import { useContext } from 'react';
import { AuthContext } from './context';

const WishList = () => {
const { wishList , setWishList  } = useContext(AuthContext);
// const getRegisterid = JSON.parse(localStorage.getItem('Register'))
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

  return (
    <div>
      <h1 className='movie-title'>WishLists</h1>
         <div className='cards'>
{/* { wishList.length == 0  ?<h2>No movies in wishlist</h2> */}

{
     storedwishlist.length == 0  ?   <h1>No Wishlist</h1>
     :             storedwishlist.map((movie , index) => (
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