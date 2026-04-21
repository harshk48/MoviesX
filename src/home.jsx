import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import PublicIcon from '@mui/icons-material/Public';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TheatersIcon from '@mui/icons-material/Theaters';

const Home = () => {

  
  return (
    <div>
<div className='hero-section'>
    <div className='hero-con'>
<h1>Book Movies , Buy Movies To Watch Online </h1>
<p>The search is over! Let Plex help you find the perfect movie to watch tonight for free.</p>
<Button> <Link to={'/category'} className='explore-btn'>EXPLORE </Link></Button>
    </div>



</div>
<div className='card'>
<Card sx={{ maxWidth: 345 }}>   
        <CardContent>
        <PublicIcon  sx={{ color: 'green' , fontSize:'40px' }}/>
         <Typography gutterBottom variant="h5" component="div">
           Works Worldwide
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           No other free streaming service delivers more content to and from more countries worldwide.
          </Typography>
        </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345 }}>   
        <CardContent>
        <OndemandVideoIcon sx={{ color: 'red' , fontSize:'40px' }}/>
      <Typography gutterBottom variant="h5" component="div">
            Device-Friendly
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Stream the good stuff from your favorite devices including Apple, Android, Smart TVs and more.
          </Typography>
        </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>

     <Card sx={{ maxWidth: 345 }}>   
        <CardContent>
        <TheatersIcon  sx={{ color: 'blue' , fontSize:'40px' }}/>
    <Typography gutterBottom variant="h5" component="div">
            Thousands of Titles
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Choose from movies, shows, sports and music documentaries, AMC series, Live TV and more.
          </Typography>
        </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
</div>





    </div>
  )
}

export default Home;