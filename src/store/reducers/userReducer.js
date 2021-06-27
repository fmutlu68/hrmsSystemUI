import {LOGOUT_USER, UPDATE_USER} from "store/actions/userActions";
import { LOGIN_USER } from "store/actions/userActions";
import { user } from "store/initialStates/user";

const initialState = {
    user: user
}

export default function userReducer(state=initialState, {type, payload}) {
    switch (type) {
        case LOGIN_USER:
            return {
                ...state,
                user:payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                user:{}
            };
        case UPDATE_USER:
            return {
                ...state,
                user: payload,
            }
        default:
            return state;
    }
}