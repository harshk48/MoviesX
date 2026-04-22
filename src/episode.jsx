import React, {useEffect, useState , useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from './context';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
<div className='episode-main-container'>
    { data.length > 1  ? <h1 className='heading'>Episode</h1> : null}   
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

    </div>
  )
}

export default Episode