import {TOGGLE_MODAL, TOGGLE_CHECKOUT_MODAL} from "../products/productActionTypes"
import * as actions from "../products/productActionTypes";

const initialStore = {
    modalIsOpen: false,
    activeProductID: null,
    checkoutModalIsOpen: false,
    checkoutModalData: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        address: "",
        mobile: ""
    },
    checkoutModalErrors: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        address: "",
        mobile: ""
    },
    checkoutModalTouched: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        address: "",
        mobile: ""
    }
}

const toggleModalReducer = (store = initialStore, action) => {
    const id = action.payload ? action.payload : null;
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...store,
                modalIsOpen: !store.modalIsOpen,
                activeProductID: id
            }

        case TOGGLE_CHECKOUT_MODAL:
            return {
                ...store,
                checkoutModalIsOpen: !store.checkoutModalIsOpen
            }

        case actions.UPDATE_ERRORS_DATA:
            return { ...store,
                checkoutModalErrors: {
                    ...action.payload
                }
            }

        case actions.UPDATE_INPUT_VALUE:
            return { ...store,
                    checkoutModalData: {
                    ...store.checkoutModalData,
                    ...action.payload
                    }
            }

        case actions.UPDATE_TOUCHED_STATUS:
            const fieldName = action.payload;
            return { ...store,
                checkoutModalTouched: {
                    ...store.checkoutModalTouched,
                    [fieldName]: true
                }
            }

        case actions.RESET_FORM_DATA:
            return { ...initialStore }

        default:
            return store
    }
}

export default toggleModalReducer;
