import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AddUser from '../../assets/images/add-user.png'
import Logo from '../../assets/images/logo.png'
import Users from '../../assets/images/users.png'
import './Header.scss'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header>
      <div className="logo--container">
        <NavLink to="/">
          <img className="logo" src={Logo} alt={'Wealth Health logo'} />
        </NavLink>
      </div>
      <h1>HRnet</h1>
      <nav>
        {pathname === '/' ? (
          <NavLink to="/employees">
            <img className="menu-icon" src={Users} alt={'list of current users icon'} />
            <span>Employees</span>
          </NavLink>
        ) : (
          <NavLink to="/">
            <img className="menu-icon" src={AddUser} alt={'Add user icon'} />
            <span>Create</span>
          </NavLink>
        )}
      </nav>
    </header>
  )
}
