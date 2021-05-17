import React, {Component} from 'react';
import timesSolid from "./times-solid.svg"
import classes from './CrossMarkBtn.module.scss';
import PropTypes from "prop-types";

class CrossMarkBtn extends Component {

    render() {
        const {id, onClickHandler} = this.props
        return (
            <img
                src={timesSolid}
                alt = 'cross-mark-icon'
                className={classes.CrossMarkBtn}
                onClick={() => onClickHandler(id)}
            />
        )
    }
}

CrossMarkBtn.propTypes = {
    onClickHandler: PropTypes.func,
    id: PropTypes.number
}

export default CrossMarkBtn