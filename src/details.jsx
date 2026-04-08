import React, { useContext } from 'react'
import { AuthContext } from './context'
import './App.css'
const Details = () => {
  const {movieDetails} = useContext(AuthContext);
  console.log(movieDetails);
  return (
    <div className=''>
      <h1 className='movie-title'>{movieDetails?.Title} Details </h1>
      <div className='cards'>
            <div key={movieDetails.imdbID} className='movie-card'>
              <img src={movieDetails.Poster} alt={movieDetails.Title} />
            <h3>{movieDetails.Title}</h3>
            <h4>{movieDetails.Year}</h4>
          </div>
        
              </div>
    </div>
  )
}

export default Details