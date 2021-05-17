import React from 'react';
import classes from './Navbar.module.scss';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className={classes.Navbar}>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName={classes.active}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" activeClassName={classes.active}>Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites" activeClassName={classes.active}>Favorites</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar