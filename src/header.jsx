import React, { use, useEffect } from 'react'
import './App.css'
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import { useAuth } from './context.jsx';

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
 const { user, logout } = useAuth();
 const { login } = useAuth();
  const handleLogout = () => {
    logout();
    
  };
    const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
    const drawerContent = (
    <List>
      <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
        <ListItemText primary="Home"  style={{ textDecoration: 'none', color: '#a00000' }}/>
      </ListItem>
      <ListItem button component={Link} to="/details" onClick={() => setDrawerOpen(false)}>
        <ListItemText primary="Details"  style={{ textDecoration: 'none', color: '#a00000' }}/>
      </ListItem>
      <Divider />
      {user ? (
        <>
          <ListItem button component={Link} to="/wishList" onClick={() => setDrawerOpen(false)}>
            <FavoriteIcon color="error" style={{ marginRight: 8 }} />
            <ListItemText primary="WishList"  style={{ textDecoration: 'none', color: '#a00000' }}/>
          </ListItem>
          <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
            <ListItemText primary="Logout"  style={{ textDecoration: 'none', color: '#a00000' }}/>
          </ListItem>
        </>
      ) : (
        <ListItem button component={Link} to="/Login" onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="Login"  style={{ textDecoration: 'none', color: '#a00000' }}/>
        </ListItem>
      )}
    </List>
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      login(email);
    }
  }, [login]);

  return (
    <div>
      <nav className='header'>
        <h1 className='logo'>MoviesX</h1>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon className='menu-btn' />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <>
            <ul>
              <li  className='headerlist'>
                <Link  to={'/'}>Home</Link>
              </li>
              <li className='headerlist'>
                <Link  to={'/details'}>Details</Link>
              </li>
            </ul>
            <div className='header__right'>
              {user ? (
                <Button variant="outlined" color="error" startIcon={<FavoriteIcon />}>
                  <Link to='/wishList' style={{ textDecoration: 'none' , color: '#a00000'}}>wishList</Link>
                </Button>
              ) : null}
              {user ? (
                <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
              ) : (
                <Button variant="contained" color="error">
                  <Link style={{ textDecoration: 'none' ,color:'inherit' }} to='/Login' >Login</Link>
                </Button>
              )}
            </div>
          </>
        )}
      </nav>
     
    </div>
  )
}

export default Header;