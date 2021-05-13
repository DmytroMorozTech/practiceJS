import React, {Component} from 'react';
import classes from './Loader.module.scss'

class Loader extends Component {
    render() {
        return (
            <div className={classes.popup}>
                <h1 className={classes.h1}>Receiving data from server</h1>
                <div className={classes.ldsRing}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        )
    }
}

export default Loader;