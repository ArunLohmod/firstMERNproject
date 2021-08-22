import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { userContex } from '../App';

const Navbar = () => {

  const {state, dispatch} = useContext(userContex);

  const RenderMenu = () =>{
    
    if(state === "true"){
      return(
        <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About Me</NavLink>
      </li>
       <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
      </li> 
      <li className="nav-item">
      <NavLink className="nav-link" to="/logout">Logout</NavLink>
    </li>
      
    </ul>
        
      )
    }
    else{
      return(
        
        <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About Me</NavLink>
      </li>
       <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
      </li> 
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Registration</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li> 
    </ul>

      )
    }
  }

    return (
        <React.Fragment>
           
        <div className="container navbar_style">
        
        <nav className="navbar navbar-expand-lg ">
  <NavLink className="navbar-brand" to="/">MyApp</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
   <RenderMenu/>
    
  </div>
</nav>
        
        </div>

        </React.Fragment>
    )
}

export default Navbar
