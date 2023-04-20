
import {
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL
} from "../constant/ContactUs"

export const contactUsReducer = (state = {}, action) => {

    switch (action.type) {

        case CONTACT_US_REQUEST: {
            return {
                loading: true,
            }
        }

        case CONTACT_US_SUCCESS:
            return {
                ...state,
                loading: false,
                contactUs: action.payload.result.message
            }

        case CONTACT_US_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;

    }
}