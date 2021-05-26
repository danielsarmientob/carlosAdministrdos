import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './navBar.css';
import { startLogout } from '../../../actions/auth';

export const NavBar = () => {
    const dispatch= useDispatch();
    const logoutApp = ()=>{
        dispatch(startLogout())
    }
    return (
        <nav className="cont-nav">
            
            <NavLink
                activeClassName='noActive' 
                className="nav-link-admi"
                to="/home/paises"
            >
                Reportes
            </NavLink>

            <div className="cont-links">
                

                    <NavLink 
                        activeClassName='active'
                        className={`nav-link-admi`} 
                        exact
                        to="/home/paises"
                    >
                        países
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className={`nav-link-admi `} 
                        exact
                        to="/home/general"
                    >
                        general
                    </NavLink>

                     <NavLink 
                        activeClassName="active"
                        className="nav-link-admi" 
                        exact
                        onClick={ logoutApp }
                        to="/login"
                    >
                        salir
                    </NavLink>
               
            </div>

        </nav>
    )
}
