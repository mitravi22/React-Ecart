import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,

} from "../constant/ProfileConstant"

export const updateProfileReducer = (state = {}, action) => {

    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        default:
            return state;
    }
}

  