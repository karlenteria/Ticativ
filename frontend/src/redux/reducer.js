import { combineReducers } from "redux";

import { logInUserReducer, artProducts, numOfinCart } from "./reducers";

const allReducers = combineReducers({
    logUser: logInUserReducer,
    allProducts: artProducts,
    numOfinCart : numOfinCart
});
export default allReducers;