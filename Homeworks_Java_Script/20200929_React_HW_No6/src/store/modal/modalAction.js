import * as actions from "../products/productActionTypes";

export const toggleModalAction = (id) => dispatch => {
    dispatch({type: actions.TOGGLE_MODAL, payload: id })
}

export const toggleCheckoutModalAction = (id) => dispatch => {
    dispatch({type: actions.TOGGLE_CHECKOUT_MODAL, payload: id })
}

export const updateErrorsDataAction = (errors) => dispatch => {
    dispatch({type: actions.UPDATE_ERRORS_DATA, payload: errors })
}

export const updateInputValueAction = (data) => dispatch => {
    dispatch({type: actions.UPDATE_INPUT_VALUE, payload: data})
}

export const updateTouchedStatusAction = (fieldName) => dispatch => {
    dispatch({type: actions.UPDATE_TOUCHED_STATUS, payload: fieldName})
}

export const resetFormData = () => dispatch => {
    dispatch({type: actions.RESET_FORM_DATA})
}





