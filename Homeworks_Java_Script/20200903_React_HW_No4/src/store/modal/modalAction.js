import * as actions from "../products/productActionTypes";

export const toggleModalAction = (id) => dispatch => {
    dispatch({type: actions.TOGGLE_MODAL, payload: id })
}
