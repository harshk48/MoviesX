import React, { useEffect , useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useAuth } from './context.jsx';
const Movies = () => {
const [data, setData] = useState([]);
 const  {user } = useAuth( );
const Movies = async () => {
const response = await fetch('http://www.omdbapi.com/?apikey=6c6e78f&s=avengers&page=1 ')
const data = await response.json();
setData(data);
console.log(data);
}
useEffect(() => {
Movies();
}, [])
 
  return (
    <div className='movies-container'>
      {data.Search?.map((movie , index) => (
        <Link to={`/Details/${movie.imdbID}`} className='cards'>
          <div key={index} className='movie-card'>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <h4>{movie.Year}</h4>

           {user ? <FavoriteIcon color="error" style={{ marginRight: 8 }} /> : null}

          </div>
        </Link>
      ))}

    </div>
  )
}

export default Movies