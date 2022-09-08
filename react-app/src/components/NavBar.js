
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { FaBars } from "react-icons/fa"

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <nav>
      <div>
        <Link to='#'>
          <FaBars onClick={showSidebar} />
        </Link>
      </div>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
            top recipes
        </NavLink>
      </div>
      <ul>
        <li>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/recipes' exact={true}>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to='/newrecipe' exact={true}>
            Post Recipe
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
