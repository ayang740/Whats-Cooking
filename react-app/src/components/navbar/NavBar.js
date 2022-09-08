
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { FaBars, FaRegWindowClose } from "react-icons/fa"
import './navbar.css'

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <nav className='navbar'>
      <div className='sidebar'>
        <Link to='#' className='menu-bars'>
          <FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
        <div className='sidebar-toggle'>
          <Link to='#' className='menu-bars'>
            <FaRegWindowClose onClick={showSidebar}/>
          </Link>
        </div>
        <ul className='sidebar-menu-items'>
          <li className='sidebar-item'>
            <NavLink className='sidebar-item-link' to='/' exact={true}>
              HOME
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink className='sidebar-item-link' to='/recipes' exact={true}>
              RECIPES
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink className='sidebar-item-link' to='/newrecipe' exact={true}>
              ADD RECIPE
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink className='sidebar-item-link' to='/login' exact={true} activeClassName='active'>
              LOGIN
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink className='sidebar-item-link' to='/sign-up' exact={true} activeClassName='active'>
              SIGN UP
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <LogoutButton />
          </li>
        </ul>
      </nav>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
            top recipes
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
