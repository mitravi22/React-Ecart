
import {
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    SINGLE_ORDER_REQUEST,
    SINGLE_ORDER_SUCCESS,
    SINGLE_ORDER_FAIL,
    CLEAR_ERROR
} from "../constant/MyOrderConstant";

export const myOrderReducer = (state = {}, action) => {

    switch (action.type) {

        case MY_ORDER_REQUEST: {
            return {
                loading: true,
                ...state
            }
        }

        case MY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                myOrder: action.payload.result.data
            }

        case MY_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;

    }

}

export const orderDetailReducer = (state = { order: {} }, action) => {

    switch (action.type) {

        case SINGLE_ORDER_REQUEST:
            return {
                loading: true,
                ...state
            }

        case SINGLE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload.result.data
            }

        case SINGLE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}