import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { FaBars, FaRegWindowClose } from "react-icons/fa"
import './navbar.css'
import { useSelector } from 'react-redux';
import DemoUser from '../auth/DemoUser';

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  const sessionUser = useSelector(state => state.session.user)


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
              <div onClick={showSidebar}>HOME</div>
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink className='sidebar-item-link' to='/recipes' exact={true}>
              <div onClick={showSidebar}>RECIPES</div>
            </NavLink>
          </li>
          {sessionUser &&
            <li className='sidebar-item'>
              <NavLink className='sidebar-item-link' to='/newrecipe' exact={true}>
                <div onClick={showSidebar}>ADD A RECIPE</div>
              </NavLink>
            </li>
          }
          {sessionUser &&
            <li className='sidebar-item'>
              <NavLink className='sidebar-item-link' to='/saved_recipes' exact={true}>
                <div onClick={showSidebar}>MY SAVED RECIPES</div>
              </NavLink>
            </li>
          }
          {!sessionUser &&
            <li className='sidebar-item'>
              <NavLink className='sidebar-item-link' to='/login' exact={true} activeClassName='active'>
                <div onClick={showSidebar}>LOGIN</div>
              </NavLink>
            </li>
          }
          {!sessionUser &&
            <li className='sidebar-item'>
              <NavLink className='sidebar-item-link' to='/sign-up' exact={true} activeClassName='active'>
                <div onClick={showSidebar}>SIGN UP</div>
              </NavLink>
            </li>
          }
          {!sessionUser &&
            <li className='sidebar-item'>
              <div onClick={showSidebar}><DemoUser /></div>
            </li>
          }
          {sessionUser &&
            <li className='sidebar-item'>
              <div onClick={showSidebar}><LogoutButton /></div>
            </li>
          }
        </ul>
      </nav>
      <div className='navbar-title'>
        <NavLink className='navbar-title-link' to='/' exact={true}>
            TopRecipes
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
