import { ShallowWrapper } from "enzyme";
// import checkPropTypes from "check-prop-types";

import rootReducer from "../store/rootReducer";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
// -----------------------------------------------
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer
 * @param  {object} initialState - Initial state for store.
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState,compose(applyMiddleware(thunk), devTools) );
};

/**
 * Return node(s) with the given data-test attribute.
 * @param  {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param  {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

// export const checkProps = (component, conformingProps) => {
//     const propError = checkPropTypes(
//         component.propTypes,
//         conformingProps,
//         "prop",
//         component.name
//     );
//     expect(propError).toBeUndefined();
// };
