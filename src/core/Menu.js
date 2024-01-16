import React from 'react'
import { Link } from 'react-router-dom'


const isActive = (currentPath, path) => {
    if (currentPath === path) {
      return { color: "#ff9900" };
    } else {
      return { color: "#ffffff" };
    }
  };
const Menu = () => {
const currentPath=window.location.pathname
console.log(currentPath)
    
  return (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className='nav-link' style={isActive(currentPath, "/")} to='/'>Home</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link'style={isActive(currentPath, "/signin")} to='/signin'>Signin</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' style={isActive(currentPath, "/signup")}to='/signup'>Signup</Link>
            </li>
          
        </ul>
    </div>
  )
}

export default Menu