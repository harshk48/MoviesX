import React, {  useContext , useEffect, useState } from 'react'
import { AuthContext } from './context'
import StarIcon from '@mui/icons-material/Star';
import './App.css'
const Details = () => {
  const {movieDetails} = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  
const DetailApi = async () => {
  const response = await fetch(`${API_URL}?i=${movieDetails.imdbID}&apikey=${API_KEY}`);
  const data = await response.json();
  setDetails(data);
  console.log(data);

}
useEffect(() => {
  DetailApi();
}, [])


  return (
    <div >
      <h1 className='movie-title'>{movieDetails?.Title}</h1>

      {details.length === 0   ? (
        <p className='load'> Please select a movie to view details</p>
      ) : (
      <div className='cards'>    
        <div key={details.imdbID} className='detail-card'>
              <img src={details.Poster} alt={details.Title} />
              <div className='details-info'>
            <h3>{details.Title}</h3>
            <p>{details.Genre}</p>
            <h4>{details.Year}</h4>
              </div>
              <div>
            <p >{details.Plot}</p>
              </div>
            <div className=''>
              <h3>Ratings</h3>
{details.Ratings?.map((rating , index) => (
  <div key={index} className='rating'>
     <StarIcon/>
    <p>{rating.Value}</p>
  </div>
))}
            </div>
          </div>
              </div>
  )}
    </div>
  )
}

export default Details