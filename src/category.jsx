import React  from 'react'
import Movies from './movies.jsx';
import Series from './series.jsx';
import Episode from './episode.jsx';


const Home = () => {

 
  return (
    <div className='home-container'>

  
        <Movies />
        <Series/>
        <Episode/>

    </div>
  )
}

export default Home;