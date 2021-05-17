import React from 'react';
import classes from './Navbar.module.scss';
import {NavLink} from 'react-router-dom'
import CartIcon from "./CartIcon/CartIcon";
import {useSelector} from "react-redux";
import {getProductsSelector} from "../../store/products/productSelectors";

const Navbar = () => {
    const products = useSelector(getProductsSelector).filter(product => product.addedToCart);

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

                    {   products.length>=1 ?
                        <CartIcon/> :
                        null}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar