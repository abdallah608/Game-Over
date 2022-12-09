import React from 'react'
import {  Link, NavLink } from 'react-router-dom'
import IMAGES from'../../imgs/index.js'
import styles from '../Navbar/Navbar.module.scss'

export default function Navbar({userData ,logOut}) {

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
  
  
  <img src={IMAGES.Logo}  alt=""  className={styles}/>
    <h5 className="navbar-brand" >Game over</h5>
  
  
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {userData?<><ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="">Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="all">ALL</NavLink>
        </li>
        
        
        <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
  Platforms
  </Link>
  <ul className="dropdown-menu bg-dark ">
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`platform/pc`} >PC</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`platform/browser`}>Browser</NavLink></li>
  </ul>
</li>
        <li className="nav-item dropdown ">
  <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
  Sort-by
  </Link>
  <ul className="dropdown-menu bg-dark">
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`sortby/release-date`} >Release-date</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`sortby/popularity`}>Popularity</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`sortby/alphabetical`}>Alphabetical</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`sortby/relevance`}>Relevance</NavLink></li>
  </ul>
</li>
        <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
  Categories
  </Link>
  <ul className="dropdown-menu bg-dark ">
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/racing`}>Racing</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/sports`}>Sports</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/social`}>Social</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/open-world`}>Open-world</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/zombie`}>Zombie</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/fantasy`}>Fantasy</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/action-rpg`}>Action-rpg</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/action`}>Action</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/flight`}>Flight</NavLink></li>
    <li><NavLink className="dropdown-item bg-transparent text-white" to={`category/battle-royale`}>battle-royal</NavLink></li>
  </ul>
</li>

        
        
  </ul> </>:''}
        
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userData?
          <li className="nav-item">
        <NavLink className="nav-link btn btn-outline-danger  " aria-current="page" onClick={logOut}>Logout</NavLink>
      </li>:<>
        <li className="nav-item"> 
          <NavLink className="nav-link btn btn-outline-secondary me-3 " aria-current="page" to="login">Login</NavLink>
        </li> 
        
         <li className="nav-item">
          <NavLink className="nav-link btn btn-outline-primary  ms-3 " aria-current="page" to="register">Join Free</NavLink>
        </li>
        </>}             

      </ul>


    </div>
  </div>
</nav>

    
    
    </>
  )
}
