import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";

const reducer = combineReducers({
    auth: auth,
    product: product,
})

export default reducer