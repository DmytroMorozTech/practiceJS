import {TOGGLE_MODAL} from "../products/productActionTypes"

const initialStore = {
    modalIsOpen: false,
    activeProductID: null
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

        default:
            return store
    }
}

export default toggleModalReducer;
