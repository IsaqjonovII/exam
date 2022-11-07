import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";

const reducer = combineReducers({
    auth,
    product,
})

export default reducer