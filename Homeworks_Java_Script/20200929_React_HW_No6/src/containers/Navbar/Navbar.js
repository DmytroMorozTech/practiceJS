import React from 'react';
import classes from './Navbar.module.scss';
import {NavLink} from 'react-router-dom'
import CartIcon from "./CartIcon/CartIcon";
import {connect} from "react-redux";

const Navbar = (props) => {
    const {products} = props;

    const productsInCart = products.filter(product => product.addedToCart);

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

                    {   productsInCart.length>=1 ?
                        <CartIcon/> :
                        null}
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productsList.products,
    }
}

export default connect(mapStateToProps, null)(Navbar);