import React, {Component} from 'react';
import classes from "./App.module.scss"
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import modalOneData from './components/Modal/ModalOneData'
import modalTwoData from './components/Modal/ModalTwoData'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalWindowIsOpen: {
                modalOne: false,
                modalTwo: false
            }}

        this.buttons = [
            {
                id: 1,
                backgroundColor: '#24b6fa',
                text: 'Open first modal',
                onClickHandler: this.onClickHandlerModalOne.bind(this)
            },
            {
                id: 2,
                backgroundColor: '#e67108',
                text: 'Open second modal',
                onClickHandler: this.onClickHandlerModalTwo.bind(this)
            }
        ]

        this.modals = new Array(modalOneData,modalTwoData);

        this.modalBtnComponents = this.createModalBtnComponents()
    }

    createModalBtnComponents() {
        return this.modals.map((modal)=> {
            let componentsArr = []
            componentsArr = modal.actions.map((action) => {
                const {id, backgroundColor, text, onClickHandler} = action
                return (
                    <Button
                        key = {id}
                        backgroundColor = {backgroundColor}
                        id={id}
                        onClickHandler = {onClickHandler.bind(this)}
                    >{text}
                    </Button>
                )
            })
            return componentsArr
        })
    }

    onClickHandlerModalOne() {
        this.setState({
            modalWindowIsOpen: {
                ...this.state.modalWindowIsOpen,
                modalOne: !this.state.modalWindowIsOpen.modalOne
            }
        })
    }

    onClickHandlerModalTwo() {
        this.setState({
            modalWindowIsOpen: {
                ...this.state.modalWindowIsOpen,
                modalTwo: !this.state.modalWindowIsOpen.modalTwo
            }
        })
    }

    render() {
        const modalWindowIsOpen = this.state.modalWindowIsOpen;
        const buttons = this.buttons;
        const [modalOne, modalTwo] = this.modals;

        return (
            <div className={classes.App}>
                {buttons.map(button => {
                    const {id, backgroundColor, text, onClickHandler} = button;

                    return (
                        <Button
                            key = {id}
                            backgroundColor = {backgroundColor}
                            onClickHandler = {onClickHandler}
                            id={id}
                        >{text}</Button>
                    )
                })}

                {modalWindowIsOpen.modalOne
                    ? <Modal
                        modalData={modalOne}
                        onClickHandler = {buttons[0].onClickHandler}
                        btnId = {buttons[0].id}
                        buttons = {this.modalBtnComponents[0]}
                    />
                    : null
                }

                {modalWindowIsOpen.modalTwo
                    ? <Modal
                        modalData={modalTwo}
                        onClickHandler = {buttons[1].onClickHandler}
                        btnId = {buttons[1].id}
                        buttons = {this.modalBtnComponents[1]}
                    />
                    : null
                }
            </div>
        )
    }
}

export default App

