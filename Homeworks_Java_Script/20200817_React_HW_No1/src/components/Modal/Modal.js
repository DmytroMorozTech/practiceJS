import React, {Component} from 'react';
import classes from './Modal.module.scss';
import CrossMarkBtn from "./crossMarkBtn/CrossMarkBtn"
import PropTypes from 'prop-types';
import ModalBg from "./ModalBg/ModalBg";

class Modal extends Component {
    render() {
        const {modalData : {header,closeButton,text}, onClickHandler, btnId,buttons} = this.props;

        return (
            <>
                <div className={classes.Modal}>
                    <div className={classes.Modal__heading}>
                        <h2>
                            <strong>{header}</strong>
                        </h2>
                        {   closeButton
                            ?
                            <CrossMarkBtn
                                onClickHandler={onClickHandler}
                                id={btnId}
                            />
                            : null}
                    </div>

                    <div className={classes.Modal__content}>
                        <p>{text}</p>
                        <div>
                            {buttons}
                        </div>
                    </div>
                </div>

                <ModalBg
                    onClickHandler={onClickHandler}
                    id={btnId}
                />
                {/* Компонент ModalBg отвечает за затемнение заднего фона при отрисовке модального окна */}
                {/* Также в этот компонент мы передаем функцию onClickHandler, которая при клике на затемненную область закроет модальное окно.*/}
            </>
        )
    }
}

Modal.propTypes = {
    modalData: PropTypes.object,
    onClickHandler: PropTypes.func,
    btnId: PropTypes.number
}

export default Modal