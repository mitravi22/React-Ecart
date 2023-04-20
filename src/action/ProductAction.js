
import axios from "axios"
import {
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERROR

} from "../constant/ProductsConstant"

export const productDetails = (id) => async (dispatch) =>{

    try {
        
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })

        const {data} = await axios.get(`/api/user-product/product-details/${id}`)

        // console.log(data,"hh")

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        })
        
    }
}

export const clearErrors =  (dispatch) => {

    dispatch({
        type: CLEAR_ERROR
    })
}