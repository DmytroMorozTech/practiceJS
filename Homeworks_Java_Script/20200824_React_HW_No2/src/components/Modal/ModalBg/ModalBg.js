import React, {Component} from 'react';
import classes from "./ModalBg.module.scss";
import PropTypes from 'prop-types';

class ModalBg extends Component {
    render() {
        const {onClickHandler} = this.props
        return (
            <div
                className={classes.ModalBg}
                onClick={() => onClickHandler()}
            />
        )
    }
}

ModalBg.propTypes = {
    onClickHandler: PropTypes.func,
    id: PropTypes.number
}

export default ModalBg