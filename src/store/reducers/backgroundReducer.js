import {background, backgrounds} from "../initialStates/background";
import {GET_BACKGROUND_BY_ID} from "../actions/backgroundActions";

const initialValues = {
    currentBackground: background,
    backgrounds: backgrounds,
}

export default function backgroundReducer(state=initialValues, {type, payload}) {
    switch (type) {
        case GET_BACKGROUND_BY_ID:
            return {
                ...state,
                currentBackground: payload,
            }
        default:
            return {
                ...state
            };
    }
}