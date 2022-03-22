import { Home, TrendingUp, Settings } from '@material-ui/icons';
import React from 'react';
import './Navbar.scss'
import Avatar from '../../resource/avatar.png'
import Dragon from '../../resource/ico.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <div className='navbar'>
          <div className="navbarWrapper">
              <div className="left">
                  <Link to="/">
                    <img
                    src={Dragon} 
                    alt="Avatar" 
                    className="logo"/>
                  </Link>
                  <span className="logoText">METRO KAFE</span>
              </div>
              <div className="right">
                  <Link to={'/'} className="icons">
                      <Home/>
                  </Link>
                  <Link to={'/'} className="icons">
                      <TrendingUp/>
                  </Link>
                  <Link to={'/settings'} className="icons">
                      <Settings/>
                  </Link>

                  <Link to={'/profile'} className="icons">
                    <img
                    src={Avatar} 
                    alt="Avatar" 
                    className="avatar"/>
                  </Link>

              </div>
          </div>
      </div>
  )
};

export default Navbar;
