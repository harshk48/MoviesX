import React from 'react';
import {useEffect, useState ,useContext} from 'react'
import { AuthContext } from './context';
import { Link } from 'react-router-dom';
import "./App.css"


const Series = () => {
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const [data, setData] = useState([]);
const [page ,setPage] = useState(1);
 const {setMovieDetails  } = useContext(AuthContext )

const seriesAPI = async  () => {
  const response = await fetch(`${API_URL}?s=series&plot=full&page=${page}&apikey=${API_KEY}`);
  const data = await response.json();
  setData(data.Search);
    console.log(data)
}
const seriesDetailsHandle = (id) => () => {
  
const selectedMovie = data.find(movie => movie.imdbID === id);
  setMovieDetails(selectedMovie);
  console.log(selectedMovie)
  
};

const handleNext = async ( ) =>{
  
  setPage(page+1)
  setData(data)
  console.log(data)
 
}

const handlePrev = async ( ) =>{
  setPage(page-1)
  setData(data)
  console.log(data)
}
useEffect(()=>{
    seriesAPI()
    
}, [page])
  return (
  
   <div className='series-main-container'>
      
          

          {
          data.length > 1 ?   <h1 className='heading'>Series</h1> : null  
          } 
        <div className='series-container'>
    {   
       page >= 1  ?   data?.map((series , index)=>(
            <Link key={index} to={`/details?${series.imdbID}`} onClick={seriesDetailsHandle(series.imdbID)} className='cards'>
              <div key={index} className='series-card'>
                <img src={series.Poster} alt={series.Title}/>
                 <h3>{series.Title}</h3>
            <h4>{series.Year}</h4>
            </div></Link>
        )) : <h1>page not found</h1>
    }


  </div>
     { data.length > 1  ? <div className='page-container'>

   <button className='prev' onClick={handlePrev }>prev</button><p>{page}</p><button className='next' onClick={handleNext}>next</button>
    </div> : null}
     
    </div>
  
 
  )
}

export default Series;