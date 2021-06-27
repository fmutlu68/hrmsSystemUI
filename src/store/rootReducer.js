import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import backgroundReducer from "./reducers/backgroundReducer";

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;