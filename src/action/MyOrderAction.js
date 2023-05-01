
import axios from "axios";
import {
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    SINGLE_ORDER_REQUEST,
    SINGLE_ORDER_SUCCESS,
    SINGLE_ORDER_FAIL,
    CLEAR_ERROR
} from "../constant/MyOrderConstant";

export const getAllOrder = (custId, token, config) => async (dispatch) => {

    try {

        dispatch({
            type: MY_ORDER_REQUEST
        })

        let queryStr = `page=${config.page}&pageSize=${config.pageSize}`;

        const { data } = await axios.get(`/api/user-order/get-all-order/${custId}?${queryStr}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // console.log(data, "ord")

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const singleOrder = (token, orderId) => async (dispatch) => {

    try {

        dispatch({
            type: SINGLE_ORDER_REQUEST,
        })

        const { data } = await axios.get(`/api/user-order/get-order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(data, "sin")

        dispatch({
            type: SINGLE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SINGLE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const clearErrors = (dispatch) => {

    dispatch({
        type: CLEAR_ERROR
    })
}