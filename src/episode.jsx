import React, {useEffect, useState , useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from './context';
import { motion } from 'framer-motion';
import {boxVariant} from './animation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons"
const Episode = () => {
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const {setMovieDetails } = useContext(AuthContext )
const [data, setData] = useState([]);

const episodeAPI = async  () => {

  const response = await fetch(`${API_URL}?s=episode&plot=full&page=1&apikey=${API_KEY}`);
  const data = await response.json();
  setData(data.Search);
    console.log(data)
   
}

const movieDetailsHandle = (id) => () => {
const selectedMovie = data.find(movie => movie.imdbID === id);

  setMovieDetails(selectedMovie);
};
useEffect(()=>{
    episodeAPI()
},[])
  return (
<motion.div className='episode-main-container'  variants={boxVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}>
    { data.length > 1  ? <h1 className='heading'>Episode <FontAwesomeIcon icon={faChevronRight} style={{color: "rgb(207, 21, 21)",}} /></h1> : null}   
    <div className='series-container'>
    {   
      data?.map((Episode , index)=>(
           <Link key={index} to={`/details?${Episode.imdbID}`} onClick={movieDetailsHandle(Episode.imdbID)} className='cards'>
             <div key={index} className='Episode-card'>
                <img src={Episode.Poster} alt={Episode.Title}/>
                 <h3>{Episode.Title}</h3>
            <h4>{Episode.Year}</h4>
            </div></Link>
        )) 
    }
    </div>

    </motion.div>
  )
}

export default Episode