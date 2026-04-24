import React, {  useContext , useEffect, useState } from 'react'
import { AuthContext } from './context'
import StarIcon from '@mui/icons-material/Star';
import './App.css'
import { motion } from 'framer-motion';
import {boxVariant} from './animation'
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
    <motion.div variants={boxVariant} className='detail-main-con'
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}>
      {details.length === 0  ? (
        <p className='load'> Please select a movie to view details</p>
      ) : (
        <div className='details-cards'>    
        <h1 className='movie-title'>{movieDetails?.Title}</h1>
        <div key={details.imdbID} className='detail-card'> 
<div className='img-con'>
              <img src={details.Poster} alt={details.Title}  />
</div>  
              <div className='details-info'> 
                  <div className=''>
            <h1>{details.Title}</h1>
                    <h3 >Directed by {details.Director}</h3>
                  </div>
                  <div className=''>
                    <p>{details.Released}</p>
                    <p>imdb:{details.imdbRating}</p>
            <p>{details.Genre}</p>
                  </div>
            <div>
            <p >{details.Plot}</p>
            </div>
            <div>
              <h2>Ratings</h2>
{details.Ratings?.map((rating , index) => (
  <div key={index} className='rating'>
     <StarIcon/>
    <p>{rating.Value}</p>
  </div>
))}
        </div>
        </div>
          </div>
              </div>

      )}
    </motion.div>

  )
}

export default Details