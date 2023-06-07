import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Header.scss'
import AddUser from '../../assets/images/add-user.png'
import Users from '../../assets/images/users.png'

export default function Header() {
  const { pathname } = useLocation()
  console.log('pathname', pathname)
  const [name, setName] = useState(false)


  useEffect(() => {
    setName(pathname)
  }, [pathname])

  return (
    <header>
      <NavLink to="/">
        <img src={Logo} alt={'Wealth Health logo'} />
      </NavLink>
      <h1>HRnet</h1>
      <nav>
        {pathname === "/" ? (
          <NavLink to="/employees">
            <img src={AddUser} alt={'Add user icon'} />
            <span>Create</span>
          </NavLink>
        ) : (
          <NavLink to="/">
            <img src={Users} alt={'list of current users icon'} />
            <span>Current employees</span>
          </NavLink>
        )

        }
      </nav>
    </header>
  )
}

Header.propTypes = {

}
