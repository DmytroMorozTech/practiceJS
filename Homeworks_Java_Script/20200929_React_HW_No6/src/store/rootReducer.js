import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import toggleModalReducer from "./modal/toggleModalReducer";

const rootReducer = combineReducers({
  productsList: productsReducer,
  modalStatus: toggleModalReducer,
});

export default rootReducer;
