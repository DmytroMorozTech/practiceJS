import React from 'react';
import classes from './Layout.module.scss';
import Navbar from "../../containers/Navbar/Navbar";
import Body from "../../containers/Body/Body";
import Cart from "../../containers/Cart/Cart";
import Favorites from "../../containers/Favorites/Favorites";
import {Switch, Route} from 'react-router-dom';

const Layout = () => {
    return (
        <div className={classes.main}>
            <Navbar/>

            <Switch>
                <Route exact path='/' render={() =>
                    <Body/>}/>
                <Route exact path='/cart' render={() =>
                    <Cart
                        crossMarkBtnIsPresent={true}
                    />}/>
                <Route exact path='/favorites' render={() =>
                    <Favorites/>}/>
            </Switch>
        </div>
    )
}

export default Layout